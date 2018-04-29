import { DefaultDOMElement } from 'substance'
import { HyperReadings } from 'hyper-readings'

function loadHyperReading () {
  return new Promise((resolve, reject) => {
    // should pass key here, but faking to begin with.
    const hr = HyperReadings()
    hr.on('error', reject)
    hr.on('ready', () => {
      // hr.removeListener('error')
      hr.import('# hello world!\n\nThis is a simple working example.\n\nHappy days.', { type: 'md' })
        .then(() => {
          resolve(hr)
        })
        .catch(reject)
    })
  })
}

function hyperReadingsImporter (key, context) {
  const dom = DefaultDOMElement.createDocument()
  return loadHyperReading(key)
    .then(async (hr) => {
      const r = await hr.root()
      await r.iterate(async (node) => {
        console.log('root-', node.name, node.type)
        if (node.iterate) {
          await node.iterate(async (node) => {
            console.log('leaf-', node.name, node.type)
            if (node.iterate) {
              await node.iterate((node) => {
                console.log('--leaf-', node.name, node.type)
              })
            }
          })
        }
      })
      const body = dom.find('body')
      const h1 = dom.createElement('h1').setTextContent('Working')
      body.appendChild(h1)
      console.log(dom.getInnerHTML())
      return {
        hr,
        dom
        // `<html><body>
        //         <h1>SimpleWriter</h1>
        //         <p>This is the official <span data-type="comment" data-comment="A JavaScript library for web-based content editing">Substance</span> editor boilerplate example. Fork it, and create your own editor.</p>
        //         <p>You can find the source code on <a href="http://github.com/substance/starter">Github</a>.</p>
        //       </body></html>`
      }
    })
}

export default hyperReadingsImporter
