import { Component } from 'substance'
import EditorPackage from './editor/EditorPackage'
import IndexPage from './IndexPage'

export default class HyperReader extends Component {
  constructor (...args) {
    super(...args)
    const { archive, shell } = this.props
    this.configurator = archive.getConfigurator()
    archive.onUpdate(() => this.rerender())
    this.handleActions({
      'hr:new': () => archive.new(),
      'hr:import': () => archive.new(),
      'hr:open': (data) => archive.load(data.key),
      'hr:reveal': (data) => shell.showItemInFolder(data.folder),
      'hr:remove': (data) => archive.remove(data.key) // TODO: add confirmation dialogue
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

  render ($$) {
    console.log('rerendering')
    let el = $$('div').addClass('sc-reader')
    const currentRoute = this.getRoute($$)
    if (currentRoute) el.append(currentRoute)
    return el
  }

  getConfigurator () {
    return this.configurator
  }
}
