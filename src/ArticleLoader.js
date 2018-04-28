import { EditorSession, Configurator } from 'substance'
// import ReadingListConfigurator from './editor/util/ReadingListConfigurator'
import EditorPackage from './editor/EditorPackage'
import HyperReadingsImporter from './converter/HyperReadingsImporter'

export default {
  load: (key, context) => {
    let configurator = new Configurator()
    configurator.import(EditorPackage)
    let hrImporter = new HyperReadingsImporter()
    let hr = hrImporter.import(key, context)
    // wait for hr to be ready
    console.log(configurator.getConverterRegistry())
    let importer = configurator.createImporter('html')
    let doc = importer.importDocument(hr.dom)
    let editorSession = new EditorSession(doc, { configurator, context })
    return editorSession
  }
}
