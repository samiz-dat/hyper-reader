import { Component } from 'substance'
import debounce from 'lodash.debounce'

export default class SimpleInput extends Component {
  constructor (...args) {
    super(...args)
    this._onInputDebounced = debounce(this._onInput.bind(this), 300, false)
  }

  validate () {
    const { validator } = this.props
    const ref = this.refs['input']
    if (!validator) return null
    const valid = validator.func(ref.el.value)
    if (!valid) {
      this._showError(validator.msg)
      return validator.msg
    }
    if (this.state.error) {
      this._hideError()
    }
    return null
  }

  _onInput (e) {
    this.validate()
  }
  _showError (message) {
    this.extendState({ error: message })
  }
  _hideError () {
    this.extendState({ error: null })
  }

  render ($$) {
    const { label, name, type, pattern } = this.props
    const { error } = this.state
    let el = $$('div').addClass('sc-input a-flex a-stretch-content')
    let inputContainer = $$('div').addClass('a-flex flex-col a-grow-1 mr3')
    let input = $$('input')
      .addClass('a-block a-b0 a-bb serif mw-100')
      .attr({
        name,
        pattern,
        type: type || 'text'
      })
      .on('input', this._onInputDebounced)
      .on('change', () => this._onInputDebounced.flush())
      .ref('input')
    let labelEl = $$('label')
      .addClass('a-flex a-grow-0 mr3 w-25')
      .attr({
        for: name
      })
      .append(label)
    inputContainer.append(input)
    if (error) {
      inputContainer.append($$('div').addClass('red bg-yellow').append(error))
    }
    el.append(labelEl, inputContainer)
    return el
  }
}
