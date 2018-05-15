import { Component } from 'substance'

export default class SimpleInput extends Component {
  render ($$) {
    const { label, name, type, pattern } = this.props
    let el = $$('div').addClass('sc-input a-flex a-stretch-content')
    let input = $$('input')
      .addClass('a-flex a-grow-1 a-mr1 a-b0 a-bb a-serif')
      .attr({
        name,
        pattern,
        type: type || 'text'
      })
    let labelEl = $$('label')
      .addClass('a-flex a-grow-1 a-mr1')
      .attr({
        for: name
      })
      .append(label)
    el.append(labelEl, input)
    return el
  }
}
