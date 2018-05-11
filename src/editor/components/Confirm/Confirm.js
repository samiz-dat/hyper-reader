import { Component } from 'substance'

export default class Confirm extends Component {
  _renderPrimaryButton ($$) {
    const {
      confirmText,
      onConfirm
    } = this.props
    if (!onConfirm) return
    return $$('button')
      .addClass('a-inline sc-button sm-style-big')
      .append(confirmText || 'Yes')
      .on('click', onConfirm)
  }
  _renderSecondaryButton ($$) {
    const {
      cancelText,
      onCancel
    } = this.props
    return $$('button')
      .addClass('a-inline sc-button sm-style-big sm-secondary')
      .append(cancelText || 'No')
      .on('click', () => {
        if (onCancel) onCancel()
        this.send('closeModal')
      })
  }

  render ($$) {
    const { content } = this.props
    let el = $$('div').addClass('sc-confirmation')

    el.append(
      $$('div').addClass('a-center').append(content),
      $$('div').addClass('a-center').append(
        this._renderPrimaryButton($$),
        this._renderSecondaryButton($$)
      )
    )
    return el
  }
}
