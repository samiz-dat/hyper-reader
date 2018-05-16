import { Component } from 'substance'
import Form from '../../components/Form/Form'
import SimpleInput from '../../components/SimpleInput/SimpleInput'
import Button from '../../components/Button/Button'

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
      $$(SimpleInput, { label: 'Key', name: 'key' }),
      $$(SimpleInput, { label: 'Name', name: 'name' }),
      $$(Button, { text: 'Import', type: 'submit' })
    )
    el.append(form)
    return el
  }
}
