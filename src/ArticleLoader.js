import { EditorSession, DefaultDOMElement } from 'substance'
import hr2doc from './converter/hr2doc'

function defaultDom () {
  const dom = DefaultDOMElement.createDocument()
  const domBody = dom.find('body')
  const h1 = dom.createElement('h1').setTextContent('Hey there!')
  const p = dom.createElement('p').setTextContent('This is a new hyper reading document')
  domBody.appendChild(h1)
  domBody.appendChild(p)
  return dom
}

export default {
  load: (dom, configurator, context) => {
    let importer = configurator.createImporter('html')
    let doc = importer.importDocument(dom || defaultDom())
    let editorSession = new EditorSession(doc, { configurator, context })
    return editorSession
  },
  loadViaDoc: async (hr, configurator, context) => {
    let doc = configurator.createDocument()
    doc = await hr2doc(doc, hr)
    let editorSession = new EditorSession(doc, { configurator, context })
    console.log('session', editorSession.getDocument().toJSON())
    return editorSession
  }
}
