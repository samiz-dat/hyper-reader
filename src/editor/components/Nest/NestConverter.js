export default {
  type: 'nest',
  tagName: 'div',
  matchElement: function (el) {
    return el.is('div[data-type="nest"]')
  },
  import: function (el, node, converter) {
    console.log('import nest', el, node)
    node.id = 'nest'
    node.nodes = el.getChildren().map(function (child) {
      var childNode = converter.convertElement(child)
      return childNode.id
    })
  },

  export: function (node, el, converter) {
    console.log('export nest', node)
    el.append(converter.convertNodes(node.nodes))
  }
}
