import { Component } from 'substance'
import EditorPackage from './editor/EditorPackage'
import ConfirmDelete from './editor/components/Modals/ConfirmDelete'
import IndexPage from './IndexPage'
import Modal from './editor/components/Modal/Modal'

const modals = {
  'confirm-delete': ConfirmDelete
}

export default class HyperReader extends Component {
  constructor (...args) {
    super(...args)
    const { archive, shell } = this.props
    this.configurator = archive.getConfigurator()
    archive.onUpdate(() => this.rerender())
    this.handleActions({
      'closeModal': () => {
        this.extendState({ modal: null })
      },
      'hr:new': () => archive.new(),
      'hr:import': () => archive.new(),
      'hr:open': (data) => archive.load(data.key),
      'hr:reveal': (data) => shell.showItemInFolder(data.folder),
      'hr:remove': (data) => {
        console.log('data', data)
        this.extendState({ 'modal': {
          type: 'confirm-delete',
          props: { key: data.key },
          options: {
            width: 'small',
            textAlign: 'center',
            title: 'Remove Reading List?'
          }
        }})
        // archive.remove(data.key)
      } // TODO: add confirmation dialogue
    })
  }

  getChildContext () {
    const configurator = this.configurator
    return {
      configurator,
      archive: this.props.archive
    }
  }

  getRoute ($$) {
    const { archive } = this.props
    const session = archive.getEditorSession()
    let component = null
    if (session) {
      component = $$(EditorPackage.Editor, {
        editorSession: session
        // disabled: true
      })
    } else {
      component = $$(IndexPage, { list: archive.list() })
    }
    return component
  }

  getModal ($$) {
    const { modal } = this.state
    if (!modal) return null
    const component = modals[modal.type]
    // console.log(modal, component)
    if (!component) return null
    return $$(Modal, modal.options).append($$(component, modal.props))
  }

  render ($$) {
    console.log('rerendering')
    let el = $$('div').addClass('sc-reader')
    const currentRoute = this.getRoute($$)
    const currentModal = this.getModal($$)
    if (currentRoute) el.append(currentRoute)
    console.log(currentModal)
    if (currentModal) el.append(currentModal)
    return el
  }

  getConfigurator () {
    return this.configurator
  }
}
