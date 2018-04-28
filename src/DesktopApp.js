import {
  DefaultDOMElement
} from 'substance'

import ChromeApp from './ChromeApp'
import HyperReader from './HyperReader'
import HyperReaderArchive from './HyperReaderArchive'

function _renderHyperReaderApp ($$, app) {
  let el = $$('div').addClass('sc-app')
  let { archive, error } = app.state
  console.log('render Reader App', archive)
  if (archive) {
    el.append(
      $$(HyperReader, {
        archive
      })
    )
  } else if (error) {
    el.append(
      'ERROR:',
      error.message
    )
  } else {
    // LOADING...
  }
  return el
}

export function _handleKeyDown (event, app) {
  // Handle custom keyboard shortcuts globally
  let archive = app.state.archive
  if (archive) {
    let manuscriptSession = archive.getEditorSession('manuscript')
    return manuscriptSession.keyboardManager.onKeydown(event)
  }
}

class DesktopApp extends ChromeApp {
  didMount () {
    super.didMount()
    this.props.ipc.on('document:save', () => {
      this._save()
    })
    this.props.ipc.on('document:save-as', (event, newArchiveDir) => {
      this._saveAs(newArchiveDir)
    })
    DefaultDOMElement.getBrowserWindow().on('click', this._click, this)
  }

  _saveAs (newArchiveDir) {
    console.info('saving as', newArchiveDir)
    // this.state.archive.saveAs(newArchiveDir).then(() => {
    //   this._updateTitle(false)
    //   this.props.ipc.send('document:save-as:successful')
    //   // Update the browser url, so on reload, we get the contents from the
    //   // new location
    //   let newUrl = this.props.url.format({
    //     pathname: this.props.path.join(this.props.__dirname, 'index.html'),
    //     protocol: 'file:',
    //     query: {
    //       archiveDir: newArchiveDir
    //     },
    //     slashes: true
    //   })
    //   window.history.replaceState({}, 'After Save As', newUrl)
    // }).catch(err => {
    //   console.error(err)
    // })
  }

  _archiveChanged () {
    const hasPendingChanges = this.state.archive.hasPendingChanges()
    if (hasPendingChanges) {
      this.props.ipc.send('document:unsaved')
      this._updateTitle(hasPendingChanges)
    }
  }

  _updateTitle (hasPendingChanges) {
    let newTitle = this.state.archive.getTitle()
    if (hasPendingChanges) {
      newTitle += ' *'
    }
    document.title = newTitle
  }

  _click (event) {
    if (event.target.tagName === 'A' && event.target.attributes.href.value !== '#') {
      event.preventDefault()
      this.props.shell.openExternal(event.target.href)
    }
  }

  _loadArchive (key, context) {
    console.log('load archive', key)
    // We do not want to use Dar - we want to load hyper-readings
    // console.log('archiveId', key)
    let archive = new HyperReaderArchive(context)
    // HACK: this should be done earlier in the lifecycle (after first didMount)
    // and later disposed properly. However we can accept this for now as
    // the app lives as a singleton atm.
    // NOTE: _archiveChanged is implemented by DesktopApp
    // archive.on('archive:changed', this._archiveChanged, this)
    // console.log('archiveId', key)
    // console.log('sssss')
    return archive.load(key)
  }

  _handleKeyDown (event) {
    return _handleKeyDown(event, this)
  }

  render ($$) {
    return _renderHyperReaderApp($$, this)
  }
}

export default DesktopApp
