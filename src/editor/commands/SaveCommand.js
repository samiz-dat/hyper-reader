import { Command } from 'substance'

export default class SaveCommand extends Command {
  getCommandState (params, context) {
    const unsaved = params.editorSession.hasUnsavedChanges()
    const newReadingList = context.archive.isNew()
    return { disabled: !(unsaved || newReadingList), active: false }
  }
  execute (params, context) {
    const { archive } = context
    const { editorSession } = params
    if (archive.isNew()) {
      // need to ask for new name
      const editor = editorSession.getEditor()
      editor.send('hr:saveAs')
      return
    }
    console.log('saving')
    editorSession.save()
      .then(() => {
        console.log('saved')
      })
    // archive.save()
    //   .then(() => {
    //     console.log('saved')
    //   })
    // const editor = params.editorSession.getEditor()
    // editor.extendState({ edit: 'confirm' })
  }
}
