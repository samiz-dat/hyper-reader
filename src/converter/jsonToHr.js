/*
 *  Temporarily - until there are scaling issues - we are exporting Docs via JSON conversion
 */

async function exportParagraph (hr, node, ctx) {
  // await hr.
  // check if it exists?
  if (hr.exists(node, '')) {}
}

var exporters = {
  'paragraph': exportParagraph
}

async function jsonToHr (hr, json) {
  for (const id in json) {
    const node = json[id]
    const exporter = exporters[node.type]
    if (exporter) {
      await exporter(hr, node, json)
    } else {
      console.warn(`No exporter for node type ${node.type}`)
    }
  }
  return hr
}

export default jsonToHr
