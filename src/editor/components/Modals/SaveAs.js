import { Component } from 'substance'
import Form from '../Form/Form'
import SimpleInput from '../SimpleInput/SimpleInput'
import Button from '../Button/Button'
import { isSimpleText } from '../../utils/validators'

export default class SaveAs extends Component {
  render ($$) {
    var el = $$('div')
    const form = $$(Form, {
      onSubmit: (data) => {
        // create new document then save
        this.context.archive.createEmptyReadingList(data.name)
          .then(() => this.context.archive.getEditorSession().save())
        this.send('closeModal')
      }
    })
    form.append(
      $$('p').addClass('mb2').append('What would you like to call your reading list?'),
      $$(SimpleInput, { label: 'Name', name: 'name', validator: { func: isSimpleText, msg: 'Requires a name!' } }).ref('name'),
      $$(Button, { text: 'Save', type: 'submit' })
    )
    el.append(form)
    return el
  }
}
