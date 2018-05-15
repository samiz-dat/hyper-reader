/*
 *  Temporarily - until there are scaling issues - we are exporting Docs via JSON conversion
 */
import { prependNamespace } from './utils'

async function exportBody (hr, node, ctx) {
  let hrRoot = await hr.root()
  if (!hrRoot) hrRoot = await hr.createNode('hr:root')
  let hrBody = await hr.body()
  if (!hrBody) {
    hrBody = await hr.createNode('hr:body')
    await hrRoot.insertNode(hrBody)
  }
  if (node.nodes) {
    for (const i in node.nodes) {
      const id = prependNamespace('hr', node.nodes[i])
      console.log('inserting', id)
      await hrBody.insertNode({ name: id })
    }
  }
  // if (hr.exists(node, '')) return
  // if (hr.exists(node, '')) return
}

async function exportHeading (hr, node, ctx) {
  // await hr.
  // check if it exists?
  console.log('hr', node, hr)
  let hrNode = null
  if (await hr.exists(prependNamespace('hr', node.id), 'doco:Title')) {
    hrNode = await hr.node({ name: prependNamespace('hr', node.id) })
  } else {
    hrNode = await hr.createNode('doco:Title', { id: prependNamespace('hr', node.id) })
  }
  if (node.content) await hrNode.set('c4o:hasContent', node.content)
  // if (node.content) await hrNode.set('c4o:hasContent', node.content)
  // if (hr.exists(node, '')) return
}

async function exportParagraph (hr, node, ctx) {
  console.log('hr', node, hr)
  let hrNode = null
  if (await hr.exists(prependNamespace('hr', node.id), 'doco:Paragraph')) {
    console.log('exists')
    hrNode = await hr.node({ name: prependNamespace('hr', node.id) })
  } else {
    hrNode = await hr.createNode('doco:Paragraph', { id: prependNamespace('hr', node.id) })
  }
  if (node.content) await hrNode.set('c4o:hasContent', node.content)
}

var exporters = {
  'body': exportBody,
  'heading': exportHeading,
  'paragraph': exportParagraph
}

async function json2Hr (hr, json) {
  console.log(json.nodes)
  for (const id in json.nodes) {
    const node = json.nodes[id]
    const exporter = exporters[node.type]
    if (exporter) {
      await exporter(hr, node, json)
    } else {
      console.warn(`No exporter for node type ${node.type}`)
    }
  }
  return hr
}

export default json2Hr
