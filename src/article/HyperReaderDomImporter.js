import { DOMImporter, DefaultDOMElement } from 'substance'

/**
  HTML importer for the SimpleArticle. We delegate the work to
  BodyConverter.
*/
class HyperReaderDomImporter extends DOMImporter {
  constructor (config) {
    console.log('created')
    super(Object.assign({ idAttribute: 'data-id' }, config))
    // only used internally for creating wrapper elements
    this._el = DefaultDOMElement.parseHTML('<html></html>')
  }

  importDocument (dom) {
    this.reset()
    this.convertDocument(dom)
    return this.state.doc
  }

  convertDocument (htmlEl) {
    var bodyEl = htmlEl.find('body')
    this.convertElement(bodyEl)
  }
}

export default HyperReaderDomImporter
