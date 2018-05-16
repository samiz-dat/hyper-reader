import { Component } from 'substance'

export default class SimpleInput extends Component {
  render ($$) {
    const { label, name, type, pattern } = this.props
    let el = $$('div').addClass('sc-input a-flex a-stretch-content')
    let input = $$('input')
      .addClass('a-flex a-grow-1 mr3 a-b0 a-bb serif')
      .attr({
        name,
        pattern,
        type: type || 'text'
      })
    let labelEl = $$('label')
      .addClass('a-flex a-grow-1 mr3')
      .attr({
        for: name
      })
      .append(label)
    el.append(labelEl, input)
    return el
  }
}
