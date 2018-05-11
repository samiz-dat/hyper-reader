import { Component } from 'substance'
import EditorPackage from './editor/EditorPackage'
import IndexPage from './IndexPage'

export default class HyperReader extends Component {
  constructor (...args) {
    super(...args)
    this.configurator = this.props.archive.getConfigurator()
    this.props.archive.onUpdate(() => this.rerender())
  }

  getChildContext () {
    const configurator = this.configurator
    return {
      configurator,
      urlResolver: this.props.archive
    }
  }

  onNew () {
    const { archive } = this.props
    archive.new()
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
      component = $$(IndexPage, {
        list: archive.list(),
        onNew: this.onNew.bind(this)
      })
    }
    return component
  }

  render ($$) {
    let el = $$('div').addClass('sc-reader')
    const currentRoute = this.getRoute($$)
    if (currentRoute) el.append(currentRoute)
    return el
  }

  getConfigurator () {
    return this.configurator
  }
}
