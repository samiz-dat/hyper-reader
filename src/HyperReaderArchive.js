// import { prettyPrintXML, PersistedDocumentArchive, DefaultDOMElement } from 'substance'
import ArticleLoader from './ArticleLoader'

/**
 *  TODO: Should move creation of hyper readings into here.
 *  HyperReadingsImport should just be concerned with interpreting
 *  hyper readings into initial dom elements
 */
export default class HyperReaderArchive {
  constructor () {
    this.readings = {}
    this.sessions = {}
  }

  getEditorSession (id) {
    return this.sessions[id]
  }

  getTitle () {
    let editorSession = this.getEditorSession('manuscript')
    let title = 'Untitled'
    if (editorSession) {
      let doc = editorSession.getDocument()
      let articleTitle = doc.find('article-title').textContent
      if (articleTitle) {
        title = articleTitle
      }
    }
    return title
  }

  load (key) {
    return this._load(key)
      .then((data) => {
        this.sessions['manuscript'] = data.editorSession
        this.readings['manuscript'] = data.hr
        return this
      })
  }

  /** Load hyperreadings as a Substance Document
   *  This returns a promise.
   */
  _load (key) {
    return ArticleLoader.load(key, {
      archive: this
    })
  }
}
