import { Component } from 'substance'
import EditorPackage from './editor/EditorPackage'

export default class HyperReader extends Component {
  constructor (...args) {
    super(...args)
    const archive = this.props.archive
    this.manuscriptSession = archive.getEditorSession('manuscript')
    this.configurator = this.manuscriptSession.getConfigurator()
  }

  getChildContext () {
    const configurator = this.configurator
    return {
      configurator,
      urlResolver: this.props.archive
    }
  }

  render ($$) {
    console.log('render HyperReader')
    let el = $$('div').addClass('sc-reader')
    el.append(
      $$(EditorPackage.Editor, {
        editorSession: this.manuscriptSession
      })
    )
    return el
  }

  getConfigurator () {
    return this.configurator
  }
}
