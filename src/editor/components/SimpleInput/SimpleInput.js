import { Component } from 'substance'

export default class SimpleInput extends Component {
  render ($$) {
    const { label, name, type, pattern } = this.props
    let el = $$('div').addClass('sc-input')
    let input = $$('input')
      .addClass('a-inline')
      .attr({
        name,
        pattern,
        type: type || 'text'
      })
    let labelEl = $$('label')
      .addClass('a-inline')
      .attr({
        for: name
      })
      .append(label)
    el.append(labelEl, input)
    return el
  }
}
