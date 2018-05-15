import {
  Component, DefaultDOMElement,
  platform
} from 'substance'

class AppChrome extends Component {
  didMount () {
    this._init()
    DefaultDOMElement.getBrowserWindow().on('keydown', this._keyDown, this)
    DefaultDOMElement.getBrowserWindow().on('drop', this._supressDnD, this)
    DefaultDOMElement.getBrowserWindow().on('dragover', this._supressDnD, this)
  }

  dispose () {
    DefaultDOMElement.getBrowserWindow().off(this)
  }

  getChildContext () {
    return this._childContext
  }

  getInitialState () {
    return {
      archive: undefined,
      error: undefined
    }
  }

  /*
    4 initialisation stages

    - _setupChildContext (sync)
    - _initContext (async)
    - _loadArchive (async)
    - _initArchive (async)
  */
  _init () {
    console.log('init')
    this._childContext = this._setupChildContext()

    let promise = this._initContext(this._childContext)
      .then(() => this._loadArchive(this._childContext))
      // .then((archive) => new Promise(resolve => setTimeout(() => resolve(archive), 2000)))
      .then(archive => {
        console.log('loaded')
        return archive
      })
      .then(archive => this._initArchive(archive, this._childContext))
      .then(archive => {
        console.log('ok')
        this.extendState({ archive })
      })

    if (!platform.devtools) {
      promise.catch(error => {
        console.log('error')
        console.error(error)
        this.extendState({ error })
      })
    }
  }

  _setupChildContext () {
    return this.context
  }

  _initContext (context) {
    return Promise.resolve(context)
  }

  _loadArchive () {
    throw new Error('_loadArchive not implemented')
  }

  _initArchive (archive) {
    return Promise.resolve(archive)
  }

  /*
    We may want an explicit save button, that can be configured on app level,
    but passed down to editor toolbars.
  */
  _save () {
    const session = this.state.archive.getEditorSession()
    if (session) return session.save()
  }

  _updateTitle () {
    // no-op
  }

  _keyDown (event) {
    if (event.key === 'Dead') return
    if (this._handleKeyDown) {
      this._handleKeyDown(event)
    }
  }

  _supressDnD (event) {
    event.preventDefault()
  }
}

export default AppChrome
