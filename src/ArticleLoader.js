import { EditorSession, Configurator } from 'substance'
// import ReadingListConfigurator from './editor/util/ReadingListConfigurator'
import EditorPackage from './editor/EditorPackage'
import hyperReadingsImporter from './converter/hyperReadingsImporter'

export default {
  load: (key, context) => {
    return hyperReadingsImporter(key, context)
      .then((data) => {
        let configurator = new Configurator()
        configurator.import(EditorPackage)
        console.log(configurator)
        let importer = configurator.createImporter('html')
        let doc = importer.importDocument(data.dom)
        let editorSession = new EditorSession(doc, { configurator, context })
        return { editorSession, hr: data.hr }
      })
  }
}
