import { Component } from 'substance'
import Form from '../Form/Form'
import SimpleInput from '../SimpleInput/SimpleInput'

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
    form.append($$(SimpleInput, { label: 'Name', name: 'name' }))
    el.append(form)
    return el
  }
}
