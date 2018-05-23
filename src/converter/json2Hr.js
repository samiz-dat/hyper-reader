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
  hrBody.updateList(node.nodes.map(n => prependNamespace('hr', n)))
}

async function exportHeading (hr, node, ctx) {
  let hrNode = null
  if (await hr.exists(prependNamespace('hr', node.id), 'doco:Title')) {
    hrNode = await hr.node({ name: prependNamespace('hr', node.id) })
  } else {
    hrNode = await hr.createNode('doco:Title', { id: prependNamespace('hr', node.id) })
  }
  hrNode.update({
    'hr:level': node.level,
    'hr:textAlign': (node.textAlign && node.textAlign !== 'left') ? node.textAlign : undefined,
    'c4o:hasContent': node.content
  })
}

async function exportParagraph (hr, node, ctx) {
  let hrNode = null
  if (await hr.exists(prependNamespace('hr', node.id), 'doco:Paragraph')) {
    hrNode = await hr.node({ name: prependNamespace('hr', node.id) })
  } else {
    hrNode = await hr.createNode('doco:Paragraph', { id: prependNamespace('hr', node.id) })
  }
  hrNode.update({
    'hr:textAlign': (node.textAlign && node.textAlign !== 'left') ? node.textAlign : undefined,
    'c4o:hasContent': node.content
  })
}

async function exportSection (hr, node, ctx) {
  let hrNode = null
  if (await hr.exists(prependNamespace('hr', node.id), 'doco:Section')) {
    hrNode = await hr.node({ name: prependNamespace('hr', node.id) })
  } else {
    hrNode = await hr.createNode('doco:Section', { id: prependNamespace('hr', node.id) })
  }
  await hrNode.updateList(node.nodes.map(n => prependNamespace('hr', n)))
}

async function exportList (hr, node, ctx) {
  let hrNode = null
  if (await hr.exists(prependNamespace('hr', node.id), 'doco:List')) {
    hrNode = await hr.node({ name: prependNamespace('hr', node.id) })
  } else {
    hrNode = await hr.createNode('doco:List', { id: prependNamespace('hr', node.id) })
  }
  await hrNode.updateList(node.items.map(n => prependNamespace('hr', n)))
  if (node.ordered !== undefined) await hrNode.set('hr:ordered', node.ordered)
  if (node.listType !== undefined) await hrNode.set('hr:listType', node.listType)
}

async function exportListItem (hr, node, ctx) {
  let hrNode = null
  if (await hr.exists(prependNamespace('hr', node.id), 'hr:ListItem')) {
    hrNode = await hr.node({ name: prependNamespace('hr', node.id) })
  } else {
    hrNode = await hr.createNode('hr:ListItem', { id: prependNamespace('hr', node.id) })
  }
  hrNode.update({
    'hr:level': node.level,
    'hr:textAlign': (node.textAlign && node.textAlign !== 'left') ? node.textAlign : undefined,
    'c4o:hasContent': node.content
  })
}

var exporters = {
  'body': exportBody,
  'heading': exportHeading,
  'paragraph': exportParagraph,
  'section': exportSection,
  'list': exportList,
  'list-item': exportListItem
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
