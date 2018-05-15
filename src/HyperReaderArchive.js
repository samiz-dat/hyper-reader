import { Configurator } from 'substance'
import ArticleLoader from './ArticleLoader'
import hr2Dom from './converter/hr2Dom'
import EditorPackage from './editor/EditorPackage'

class SaveHandler {
  saveDocument ({ editorSession }) {
    const { archive } = editorSession.getContext()
    if (!archive) return Promise.resolve()
    return archive.save()
  }
}

export default class HyperReaderArchive {
  // injecting the HyperReadings library into the Archive
  constructor (hrManager) {
    this.manager = hrManager
    hrManager.on('ready', () => this.update())
    this.session = null
    this.selected = null
    this._setupConfigurator()
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

  update () {
    if (this.updateHandler) this.updateHandler()
  }

  closeSession () {
    console.log('closed')
    this.session = null
    this.selected = null
    this.update()
  }

  getEditorSession () {
    return this.session
  }

  isNew () {
    return this.selected === 'new'
  }

  list () {
    return this.manager.list()
  }

  async remove (key) {
    await this.manager.remove(key)
    this.update()
  }

  getTitle () {
    let title = 'Untitled'
    return title
  }

  async new (name) {
    // get new empty session
    this.session = ArticleLoader.load(null, this.configurator, { archive: this })
    this.selected = 'new'
    this.update()
    return this
  }

  async load (key) {
    return this._load(key)
      .then((session) => {
        this.session = session
        this.selected = key
        // can listen to changes here - and only save changes
        // to start with node deletions will probably be priority.
        // data.editorSession.onUpdate('document', (change) => {
        //   console.log('cccc', change)
        // }, this)
        this.update()
        return this
      })
  }

  async save () {
    let doc = this.session.getDocument()
    console.log('save', doc.toJSON())
    // process document
  }

  /** Load hyperreadings as a Substance Document
   *  This returns a promise.
   */
  async _load (key) {
    const hr = this.manager.get(key)
    // await hr.import('# hello\n\nworld', { type: 'md' })
    const dom = await hr2Dom(hr)
    return ArticleLoader.load(dom, this.configurator, { archive: this })
  }
}
