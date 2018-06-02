import { Component } from 'substance'
import Form from '../Form/Form'
import SimpleInput from '../SimpleInput/SimpleInput'
import Button from '../Button/Button'
import { isKey } from '../../utils/validators'

export default class ImportByKey extends Component {
  render ($$) {
    var el = $$('div')
    const form = $$(Form, {
      onSubmit: (data) => {
        const { key } = data
        if (key) {
          this.context.archive.import(key)
          this.send('closeModal')
        }
      }
    })
    form.append(
      $$('p').addClass('mb2').append('Enter the unique key for the reading list you want to import.'),
      $$('div').addClass('a-flex a-stretch-content a-grow-1 pt3 pb4' ).append(
        $$(SimpleInput, { label: 'Key',  name: 'key', validator: { func: isKey, msg: 'Requires valid key!' } })
          .ref('input-key'),
        $$(Button, { text: 'Import', type: 'submit' }),
      ),
      $$('p').append('By importing a reading list you are helping to archive it. When Hyper Reader is open you will be helping share this reading list with others.')
    ).ref('form')
    el.append(form).ref('form-container')
    return el
  }
}
