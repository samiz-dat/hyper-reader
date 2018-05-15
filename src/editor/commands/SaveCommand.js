import { Command } from 'substance'

export default class SaveCommand extends Command {
  getCommandState (params, context) {
    const unsaved = params.editorSession.hasUnsavedChanges()
    const newReadingList = context.archive.isNew()
    return { disabled: !(unsaved || newReadingList), active: false }
  }
  execute (params, context) {
    console.log('params', params)
    console.log('context', context)
    const editor = params.editorSession.getEditor()
    editor.extendState({ edit: 'confirm' })
  }
}
