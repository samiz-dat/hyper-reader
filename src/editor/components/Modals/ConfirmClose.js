import { Component } from 'substance'
import Confirm from '../Confirm/Confirm'

export default class ConfirmClose extends Component {
  render ($$) {
    var el = $$('div')
    const confirm = $$(Confirm, {
      onConfirm: () => {
        this.context.archive.closeSession()
        this.send('closeModal')
      }
    })
    confirm.append('You have unsaved changes! Are you sure you want to quit?')
    el.append(confirm)
    return el
  }
}
