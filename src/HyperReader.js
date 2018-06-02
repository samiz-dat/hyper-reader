import { Component } from 'substance'
import EditorPackage from './editor/EditorPackage'
import Modal from './editor/components/Modal/Modal'
import SaveAs from './editor/components/Modals/SaveAs'
import Share from './editor/components/Modals/Share'
import ConfirmDelete from './editor/components/Modals/ConfirmDelete'
import ConfirmClose from './editor/components/Modals/ConfirmClose'
import ImportByKey from './editor/components/Modals/ImportByKey'
import Spinner from './editor/components/Spinner/Spinner'
import IndexPage from './IndexPage'

const modals = {
  'save-as': SaveAs,
  'confirm-close': ConfirmClose,
  'confirm-delete': ConfirmDelete,
  import: ImportByKey,
  share: Share
}

export default class HyperReader extends Component {
  constructor (...args) {
    super(...args)
    const { archive, shell } = this.props
    this.configurator = archive.getConfigurator()
    archive.onUpdate(() => this.rerender())
    this.handleActions({
      'closeModal': () => this.extendState({ modal: null }),
      'hr:share': (data) => this.extendState({ 'modal': {
        type: 'share',
        props: data,
        options: {
          width: 'small',
          title: 'Share This Reading List'
        }
      }}),
      'hr:saveAs': () => this.extendState({ 'modal': {
        type: 'save-as',
        options: {
          width: 'small',
          title: 'Save Your New Reading List'
        }
      }}),
      'hr:confirmClose': () => this.extendState({ 'modal': {
        type: 'confirm-close',
        options: {
          width: 'small',
          title: 'Close'
        }
      }}),
      'hr:new': () => archive.new(),
      'hr:import': () => this.extendState({ 'modal': {
        type: 'import',
        options: {
          width: 'medium',
          title: 'Import a New Reading List by Key?'
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
      }
    })
  }

  getChildContext () {
    const configurator = this.configurator
    return {
      configurator,
      archive: this.props.archive,
      disabled: !this.props.archive.isEditable()
    }
  }

  getRoute ($$) {
    const { archive } = this.props
    const session = archive.getEditorSession()
    let component = null
    if (session) {
      component = $$(EditorPackage.Editor, {
        editorSession: session,
        disabled: !this.props.archive.isEditable()
      })
    } else {
      component = $$(IndexPage, { list: archive.list() })
    }
    return component.ref('route')
  }

  getModal ($$) {
    const { modal } = this.state
    if (!modal) return null
    const component = modals[modal.type]
    // console.log(modal, component)
    if (!component) return null
    return $$(Modal, modal.options).append(
      $$(component, modal.props || {}).ref('modal-content')
    ).ref('modal')
  }

  render ($$) {
    console.log('rerendering')
    let el = $$('div').addClass('sc-reader').ref('reader')
    const currentRoute = this.getRoute($$)
    const currentModal = this.getModal($$)
    if (currentRoute) el.append(currentRoute)
    if (currentModal) el.append(currentModal)
    if (this.props.archive.loading) el.append($$(Spinner))
    return el
  }

  getConfigurator () {
    return this.configurator
  }
}
