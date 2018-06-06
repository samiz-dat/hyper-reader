import { Configurator } from 'substance'
import ArticleLoader from './ArticleLoader'
// import hr2Dom from './converter/hr2Dom'
import json2Hr from './converter/json2Hr'
import EditorPackage from './editor/EditorPackage'

class SaveHandler {
  saveDocument ({ editorSession }) {
    const { archive } = editorSession.getContext()
    if (!archive) return Promise.resolve()
    return archive.save()
  }
}

// const delay = (t) => new Promise(resolve => setTimeout(resolve, t))

export default class HyperReaderArchive {
  // injecting the HyperReadings library into the Archive
  constructor (hrManager) {
    this.loading = true
    this.manager = hrManager
    this.statsIntervalId = null
    hrManager.on('ready', () => {
      this.loading = false
      this._update()
      this.startStatsPoll()
    })
    this.session = null
    this.selected = null
    this._setupConfigurator()
  }

  _startPollingStats () {
    this.statsIntervalId = setInterval(this._statPoll.bind(this), 1000)
  }

  _statPoll () {
    const newStats = this.manager.stats()
    // TODO: do not update if stats are the same
    // - including local stats.
    // Perhaps better to implement redux
    this.stats = newStats
    this._update()
  }

  startStatsPoll () {
    if (!this.statsIntervalId) this.statsIntervalId = setInterval(this._statPoll.bind(this), 1000)
  }
  stopStatsPoll () {
    if (this.statsIntervalId) {
      clearInterval(this.statsIntervalId)
      this.statsIntervalId = null
    }
  }

  // This is pretty stupid. Need a smarter way of handling state.
  // It would be best if this did not force a rerender of the entire
  // view each time the loader changes. Should implement a Redux-like
  // solution where state is connected to components.
  _setLoading (fn) {
    this.loading = true
    this._update()
    return fn()
      .then(() => {
        this.loading = false
        this._update()
      })
      .catch((e) => {
        this.loading = false
        this._update()
        throw e
      })
  }

  _setupConfigurator () {
    this.configurator = new Configurator()
    this.configurator.setSaveHandlerClass(SaveHandler)
    this.configurator.import(EditorPackage)
  }

  getConfigurator () {
    return this.configurator
  }

  onUpdate (handler) {
    this.updateHandler = handler
  }

  _update () {
    if (this.updateHandler) this.updateHandler()
  }

  closeSession () {
    console.log('closed')
    this.session = null
    this.selected = null
    this._update()
    this.startStatsPoll()
  }

  getEditorSession () {
    return this.session
  }

  isNew () {
    return this.selected === 'new'
  }

  isEditable () {
    if (!this.selected) return false
    if (this.selected === 'new') return true
    let hrInfo = this.manager.get(this.selected)
    if (!hrInfo) return false
    return hrInfo.authorised
  }

  list () {
    return this.manager.list()
  }

  get (key) {
    return this.manager.get(key)
  }

  async remove (key) {
    return this._setLoading(() => this.manager.remove(key))
  }

  getTitle () {
    /* TODO: get this from the selected hyper-reading  */
    let title = 'Untitled'
    return title
  }

  async new (name) {
    // get new empty session
    this.session = ArticleLoader.load(null, this.configurator, { archive: this })
    this.selected = 'new'
    this.stopStatsPoll()
    this._update()
    return this
  }

  async import (key) {
    return this._setLoading(() => this.manager.import(key))
  }

  async load (key) {
    return this._setLoading(() => {
      return this._load(key)
        .then((session) => {
          this.stopStatsPoll()
          this.session = session
          this.selected = key
          // can listen to changes here - and only save changes
          // to start with node deletions will probably be priority.
          // session.onUpdate('document', (change) => {
          //   console.log('cccc', change)
          // }, this)
        })
    })
  }

  async createEmptyReadingList (name) {
    if (!this.selected) return
    return this._setLoading(async () => {
      const hr = await this.manager.new(name)
      this.selected = hr.key
    })
  }

  async save () {
    if (!this.selected) return
    let doc = this.session.getDocument()
    let hrInfo = this.manager.get(this.selected)
    if (!hrInfo) { // document does not exist
      throw new Error('HyperReadings document does not exist')
    }
    return this._setLoading(async () => {
      console.log('save', doc.toJSON())
      await json2Hr(hrInfo.hr, doc.toJSON())
    })
  }

  /** Load hyperreadings as a Substance Document
   *  This returns a promise.
   */
  async _load (key) {
    const hr = this.manager.get(key)
    // await hr.import('# hello\n\nworld', { type: 'md' })
    // const dom = await hr2Dom(hr.hr)
    return ArticleLoader.loadViaDoc(hr.hr, this.configurator, { archive: this })
  }
}
