export default {
  type: 'section',
  // tagName: 'div',
  matchElement: function (el) {
    return el.is('div') || el.is('section')
  },
  import: function (el, node, converter) {
    console.log('import section', el, node)
    console.log('id', el.getAttribute('data-id'))
    node.nodes = el.getChildren().map(function (child) {
      var childNode = converter.convertElement(child)
      return childNode.id
    })
  },

  export: function (node, el, converter) {
    console.log('export section', node)
    el.append(converter.convertNodes(node.nodes))
  }
}
