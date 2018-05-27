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

async function exportEmphasis (hr, node, ctx) {
  console.log('exporting emphasis')
  let hrNode = null
  if (await hr.exists(prependNamespace('hr', node.id), 'hr:Emphasis')) {
    hrNode = await hr.node({ name: prependNamespace('hr', node.id) })
  } else {
    hrNode = await hr.createNode('hr:Emphasis', { id: prependNamespace('hr', node.id) })
  }
  const parentId = node.start.path[0]
  const parent = await hr.node(prependNamespace('hr', parentId))
  await parent.add('hr:hasAnnotation', { name: prependNamespace('hr', node.id) })
  hrNode.update({
    'hr:start': node.start.offset,
    'hr:end': node.end.offset
  })
}

async function exportStrong (hr, node, ctx) {
  console.log('exporting strong')
  let hrNode = null
  if (await hr.exists(prependNamespace('hr', node.id), 'hr:Strong')) {
    hrNode = await hr.node({ name: prependNamespace('hr', node.id) })
  } else {
    hrNode = await hr.createNode('hr:Strong', { id: prependNamespace('hr', node.id) })
  }
  const parentId = node.start.path[0]
  const parent = await hr.node(prependNamespace('hr', parentId))
  await parent.add('hr:hasAnnotation', { name: prependNamespace('hr', node.id) })
  hrNode.update({
    'hr:start': node.start.offset,
    'hr:end': node.end.offset
  })
}

var exporters = {
  'body': {
    fn: exportBody,
    priority: 1
  },
  'heading': {
    fn: exportHeading,
    priority: 1
  },
  'paragraph': {
    fn: exportParagraph,
    priority: 1
  },
  'section': {
    fn: exportSection,
    priority: 1
  },
  'list': {
    fn: exportList,
    priority: 1
  },
  'list-item': {
    fn: exportListItem,
    priority: 0
  },
  'emphasis': {
    fn: exportEmphasis,
    priority: 0
  },
  'strong': {
    fn: exportStrong,
    priority: 0
  }
}

async function json2Hr (hr, json) {
  console.log(json.nodes)
  // crude sorting of dependent nodes
  const ids = Object.keys(json.nodes).sort((a, b) => {
    const aExporter = exporters[json.nodes[a].type]
    const bExporter = exporters[json.nodes[b].type]
    const _a = aExporter ? aExporter.priority : -1
    const _b = bExporter ? bExporter.priority : -1
    if (_a > _b) return -1
    if (_a < _b) return 1
    return 0
  })
  console.log(ids)
  for (const id of ids) {
    const node = json.nodes[id]
    const exporter = exporters[node.type]
    if (exporter) {
      console.log('exporting', node.type)
      await exporter.fn(hr, node, json)
    } else {
      console.warn(`No exporter for node type ${node.type}`)
    }
  }
  return hr
}

export default json2Hr
