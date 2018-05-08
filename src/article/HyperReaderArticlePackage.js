import { Document } from 'substance'
// import HyperReaderArticleImporter from './HyperReaderArticleImporter'
import HyperReaderDomImporter from './HyperReaderDomImporter'
// import TextureHTMLConverters from './TextureHTMLConverters'

export default {
  name: 'HyperReadingArticle',
  configure (config) {
    config.defineSchema({
      version: 1,
      name: 'hyper-reader-article',
      DocumentClass: Document,
      defaultTextType: 'paragraph'
    })
    config.addImporter('html', HyperReaderDomImporter)
    // // enable rich-text support for clipboard
    // TextureHTMLConverters.forEach((converter) => {
    //   config.addConverter('html', converter)
    // })
  }
}
