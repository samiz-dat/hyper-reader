import { EditorSession, DefaultDOMElement } from 'substance'
import hr2doc from './converter/hr2doc'

function defaultDom () {
  const dom = DefaultDOMElement.createDocument()
  const domBody = dom.find('body')
  const h1 = dom.createElement('h1').setTextContent('Hey there!')
  const p1 = dom.createElement('p').setTextContent('This is a new hyper reading document')
  const p2 = dom.createElement('p').setTextContent('You can start writing your own reading list here.')
  const p3 = dom.createElement('p').setTextContent('You do not need to structure it in any particular way.')
  domBody.appendChild(h1)
  domBody.appendChild(p1)
  domBody.appendChild(p2)
  domBody.appendChild(p3)
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
