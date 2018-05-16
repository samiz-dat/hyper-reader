import { Component } from 'substance'
import EditorPackage from './editor/EditorPackage'
import Modal from './editor/components/Modal/Modal'
import SaveAs from './editor/components/Modals/SaveAs'
import ConfirmDelete from './editor/components/Modals/ConfirmDelete'
import ConfirmClose from './editor/components/Modals/ConfirmClose'
import ImportByKey from './editor/components/Modals/ImportByKey'
import Spinner from './editor/components/Spinner/Spinner'
import IndexPage from './IndexPage'

const modals = {
  'save-as': SaveAs,
  'confirm-close': ConfirmClose,
  'confirm-delete': ConfirmDelete,
  import: ImportByKey
}

export default class HyperReader extends Component {
  constructor (...args) {
    super(...args)
    const { archive, shell } = this.props
    this.configurator = archive.getConfigurator()
    archive.onUpdate(() => this.rerender())
    this.handleActions({
      'closeModal': () => this.extendState({ modal: null }),
      'hr:saveAs': () => this.extendState({ 'modal': {
        type: 'save-as',
        props: {},
        options: {
          width: 'small',
          title: 'Save New Reading List'
        }
      }}),
      'hr:confirmClose': () => this.extendState({ 'modal': {
        type: 'confirm-close',
        props: {},
        options: {
          width: 'small',
          title: 'Close'
        }
      }}),
      'hr:new': () => archive.new(),
      'hr:import': () => this.extendState({ 'modal': {
        type: 'import',
        props: {},
        options: {
          width: 'small',
          title: 'Import New Reading List by Key?'
        }
      }}),
      'hr:open': (data) => archive.load(data.key),
      'hr:reveal': (data) => shell.showItemInFolder(data.folder),
      'hr:remove': (data) => {
        this.extendState({ 'modal': {
          type: 'confirm-delete',
          props: { key: data.key },
          options: {
            width: 'small',
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
    if (currentModal) el.append(currentModal)
    if (this.state.loading) el.append($$(Spinner))
    return el
  }

  getConfigurator () {
    return this.configurator
  }
}
