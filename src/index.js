// import { Configurator, EditorSession } from 'substance'
// // import hyperreadings from 'hyper-readings'

// import HyperReadingsViewer from '../lib/HyperReadingsViewer/HyperReadingsViewer'
// import HyperReadingsViewerPackage from '../lib/HyperReadingsViewer/HyperReadingsViewerPackage'
// import fixture from './fixture'
// let cfg = new Configurator()
// cfg.import(HyperReadingsViewerPackage)

// // console.log('hyper readings', hyperreadings)

// window.onload = function () {
//   // Import article from HTML markup
//   let importer = cfg.createImporter('html')
//   let doc = importer.importDocument(fixture)
//   // fixture(doc)
//   // This is the data structure manipulated by the editor
//   let editorSession = new EditorSession(doc, {
//     configurator: cfg
//   })
//   // Mount SimpleWriter to the DOM and run it.
//   var hr = HyperReadingsViewer.mount({
//     editorSession: editorSession,
//     // hr: hyperreadings()
//   }, document.body)
//   setTimeout(() => {
//     hr.rerender()
//   }, 5000)
// }
