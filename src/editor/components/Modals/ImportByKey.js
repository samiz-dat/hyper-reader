import { Component } from 'substance'
import Form from '../Form/Form'
import SimpleInput from '../SimpleInput/SimpleInput'
import Button from '../Button/Button'
import { isKey, isSimpleText } from '../../utils/validators'

export default class ImportByKey extends Component {
  render ($$) {
    var el = $$('div')
    const form = $$(Form, {
      onSubmit: (data) => {
        const { key, name } = data
        console.log('data', data)
        if (key) {
          this.context.archive.import(key, name)
          this.send('closeModal')
        }
      }
    })
    form.append(
      $$(SimpleInput, { label: 'Key', name: 'key', validator: { func: isKey, msg: 'Requires valid key!' } }),
      $$(SimpleInput, { label: 'Name', name: 'name', validator: { func: isSimpleText, msg: 'Requires a name!' } }),
      $$(Button, { text: 'Import', type: 'submit' })
    )
    el.append(form)
    return el
  }
}
