import { Component } from 'substance'
import Confirm from '../Confirm/Confirm'

// import Form from '../../components/Form/Form'
// import SimpleInput from '../../components/SimpleInput/SimpleInput'
// import Button from '../../components/Button/Button'

export default class ConfrimDelete extends Component {
  render ($$) {
    var el = $$('div')
    const confirm = $$(Confirm, {
      onConfirm: () => {
        const { key } = this.props
        if (key) this.context.archive.remove(key)
        this.send('closeModal')
      }
    })
    confirm.append('Are you really sure you want to delete this reading list?')
    el.append(confirm)
    return el
  }
}
