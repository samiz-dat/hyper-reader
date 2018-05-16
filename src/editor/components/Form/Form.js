import { Component } from 'substance'

// TODO: write unit tests for this
function extractValuesFromForm (form) {
  const data = {}
  const elements = form.elements
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    if (!el.name) continue
    const nodeName = el.nodeName.toLowerCase()
    const type = el.type ? el.type.toLowerCase() : ''
    if (nodeName === 'input' && (type === 'checkbox' || type === 'radio')) {
      if (!el.checked) {
        continue
      }
    }
    if (nodeName === 'select') {
      data[el.name] = []
      for (var j = 0; j < el.options.length; j++) {
        var option = el.options[j]
        if (option.selected) {
          var valueAttr = option.getAttributeNode('value')
          var value = (valueAttr && valueAttr.specified) ? option.value : option.text
          data[el.name].push(value)
        }
      }
    } else {
      data[el.name] = el.value
    }
  }
  return data
}

class Form extends Component {
  render ($$) {
    let el = $$('form')
      .attr({ method: 'post', action: '/', role: 'Form' })
      .addClass('sc-form')
      .ref('form')
    el.append(this.props.children)
    el.on('submit', (e) => this._onSubmit(e))
    return el
  }

  _onSubmit (e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('sub')
    if (!this.props.onSubmit) return
    // although can also use e.target rather than ref.el.el
    const data = extractValuesFromForm(this.refs['form'].el.el)
    this.props.onSubmit(data)
  }
}

export default Form
