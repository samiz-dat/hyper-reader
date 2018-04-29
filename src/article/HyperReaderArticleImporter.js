import { HTMLImporter } from 'substance'

/**
  HTML importer for the SimpleArticle. We delegate the work to
  BodyConverter.
*/
class HyperReaderArticleImporter extends HTMLImporter {
  convertDocument (htmlEl) {
    var bodyEl = htmlEl.find('body')
    this.convertElement(bodyEl)
  }
}

export default HyperReaderArticleImporter
