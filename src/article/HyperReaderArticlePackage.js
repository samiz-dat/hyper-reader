import { Document } from 'substance'
import HyperReaderArticleImporter from './HyperReaderArticleImporter'
// import TextureHTMLConverters from './TextureHTMLConverters'

export default {
  name: 'HyperReadingArticle',
  configure (config) {
    config.defineSchema({
      version: 1,
      name: 'hyper-reader-article',
      ArticleClass: Document,
      defaultTextType: 'paragraph'
    })
    config.addImporter('html', HyperReaderArticleImporter)
    // // enable rich-text support for clipboard
    // TextureHTMLConverters.forEach((converter) => {
    //   config.addConverter('html', converter)
    // })
  }
}
