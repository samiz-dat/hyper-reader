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
      $$('p').addClass('mb2').append('Enter the unique key for the reading list you want to import.'),
      $$(SimpleInput, { label: 'Key', name: 'key', validator: { func: isKey, msg: 'Requires valid key!' } })
        .ref('input-key'),
      $$(SimpleInput, { label: 'Name', name: 'name', validator: { func: isSimpleText, msg: 'Requires a name!' } })
        .ref('input-name'),
      $$(Button, { text: 'Import', type: 'submit' }),
      $$('p').append('By importing a reading list you are helping to archive it. When Hyper Reader is open you will be helping share this reading list with others.')
    ).ref('form')
    el.append(form).ref('form-container')
    return el
  }
}
