import { stripNamespace } from './utils'

function importNodes (doc, nodes) {
  doc.import(function (tx) {
    nodes.forEach(n => {
      if (!n) return
      if (tx.get(n.id)) {
        tx.delete(n.id)
      }
      tx.create(n)
    })
  })
}

async function renderBody (doc, node, hr) {
  // const id = stripNamespace(node.name)
  const nodes = []
  await node.iterate((child) => {
    nodes.push(stripNamespace(child.name))
  })
  importNodes(doc, [{ id: 'body', type: 'body', nodes }])
  await node.iterate(executeImport(doc, hr))
  return doc
}

async function renderSection (doc, node, hr) {
  const id = stripNamespace(node.name)
  const nodes = []
  await node.iterate((child) => {
    nodes.push(stripNamespace(child.name))
  })
  importNodes(doc, [{ id, type: 'section', nodes }])
  await node.iterate(executeImport(doc, hr))
  return doc
}

async function getListItem (node) {
  const id = stripNamespace(node.name)
  const props = await node.properties()
  return {
    id,
    type: 'list-item',
    content: props['c4o:hasContent'],
    level: props['hr:level']
  }
}

async function renderList (doc, node, hr) {
  const id = stripNamespace(node.name)
  const props = await node.properties()
  const nodes = []
  const markupNodes = []
  await node.iterate(async (child) => {
    if (child.type !== 'hr:ListItem') {
      console.warn('List', id, 'contains non hr:ListItem child')
      return
    }
    nodes.push(await getListItem(child))
    const markup = await getMarkupNodes(child)
    markupNodes.push(...markup)
  })
  const data = {
    id,
    type: 'list',
    items: nodes.map(n => n.id),
    order: props['hr:order'],
    listType: props['hr:listType']
  }
  importNodes(doc, [...nodes, ...markupNodes, data])
  await node.iterate(executeImport(doc, hr))
  return doc
}

async function renderTitle (doc, node) {
  const id = stripNamespace(node.name)
  const props = await node.properties()
  const markupNodes = await getMarkupNodes(node)
  const title = {
    id,
    type: 'heading',
    content: props['c4o:hasContent'],
    level: props['hr:level']
  }
  importNodes(doc, [title, ...markupNodes])
  return doc
}

async function emphasisMarkup (parentId, node) {
  const markupProps = await node.properties()
  return {
    id: stripNamespace(node.name),
    type: 'emphasis',
    start: {
      path: [parentId, 'content'],
      offset: markupProps['hr:start']
    },
    end: {
      path: [parentId, 'content'],
      offset: markupProps['hr:end']
    }
  }
}

async function strongMarkup (parentId, node) {
  const markupProps = await node.properties()
  return {
    id: stripNamespace(node.name),
    type: 'strong',
    start: {
      path: [parentId, 'content'],
      offset: markupProps['hr:start']
    },
    end: {
      path: [parentId, 'content'],
      offset: markupProps['hr:end']
    }
  }
}

async function linkMarkup (parentId, node) {
  const markupProps = await node.properties()
  return {
    id: stripNamespace(node.name),
    type: 'link',
    url: markupProps['hr:url'],
    start: {
      path: [parentId, 'content'],
      offset: markupProps['hr:start']
    },
    end: {
      path: [parentId, 'content'],
      offset: markupProps['hr:end']
    }
  }
}

async function commentMarkup (parentId, node) {
  const markupProps = await node.properties()
  return {
    id: stripNamespace(node.name),
    type: 'comment',
    content: markupProps['hr:content'],
    start: {
      path: [parentId, 'content'],
      offset: markupProps['hr:start']
    },
    end: {
      path: [parentId, 'content'],
      offset: markupProps['hr:end']
    }
  }
}

const markupImporters = {
  'hr:Emphasis': emphasisMarkup,
  'hr:Strong': strongMarkup,
  'hr:Link': linkMarkup,
  'hr:Comment': commentMarkup
}

async function getMarkupNodes (parentNode) {
  const parentId = stripNamespace(parentNode.name)
  const markupNodes = await parentNode.all('hr:hasMarkup')
  const nodes = await Promise.all(markupNodes.map(async (node) => {
    const importer = markupImporters[node.type]
    if (!importer) return
    return importer(parentId, node)
  }))
  return nodes
}

async function renderParagraph (doc, node, hr) {
  const id = stripNamespace(node.name)
  const props = await node.properties()
  const markupNodes = await getMarkupNodes(node)
  // get all markupNodes to load
  const data = {
    id,
    type: 'paragraph',
    content: props['c4o:hasContent']
  }
  importNodes(doc, [data, ...markupNodes])
  return doc
}

const importers = {
  'hr:body': renderBody,
  'doco:Section': renderSection,
  'doco:Title': renderTitle,
  'doco:Paragraph': renderParagraph,
  'doco:List': renderList
}

function executeImport (doc, hr) {
  return (node) => {
    console.log('importing --', node.name, node.type)
    const importer = importers[node.type]
    if (!importer) {
      console.warn('No importer setup for', node.type)
      return
    }
    return importer(doc, node, hr)
  }
}

function log (hr) {
  return new Promise((resolve, reject) => {
    const stream = hr.graph.db.createHistoryStream('/')
    stream.on('data', n => { if (n.key.startsWith('spo/')) console.log(n.key) })
    stream.on('end', resolve)
    stream.on('error', reject)
  })
}

async function importDocument (doc, hr) {
  // await log(hr)
  // is there a body elemen
  const hrBody = await hr.body()
  console.log('hr', hrBody.name, hrBody.type)
  if (!hrBody) return doc
  console.log('iterating')
  await executeImport(doc, hr)(hrBody)
  return doc
}

function hr2Dom (doc, hr) {
  return importDocument(doc, hr)
}

export default hr2Dom
