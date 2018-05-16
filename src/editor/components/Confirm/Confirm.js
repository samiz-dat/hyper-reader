import { Component } from 'substance'
import Button from '../Button/Button'

export default class Confirm extends Component {
  _renderPrimaryButton ($$) {
    const {
      confirmText,
      onConfirm
    } = this.props
    if (!onConfirm) return
    return $$(Button, { text: confirmText || 'Yes' })
      .on('click', onConfirm)
  }
  _renderSecondaryButton ($$) {
    const {
      cancelText,
      onCancel
    } = this.props
    return $$(Button, { status: 'secondary', text: cancelText || 'No' })
      .on('click', () => {
        if (onCancel) onCancel()
        this.send('closeModal')
      })
  }

  render ($$) {
    let el = $$('div').addClass('sc-confirmation')
    el.append(
      $$('div').addClass('tc').append(this.props.children),
      $$('div').addClass('tc').append(
        this._renderPrimaryButton($$),
        this._renderSecondaryButton($$)
      )
    )
    return el
  }
}
