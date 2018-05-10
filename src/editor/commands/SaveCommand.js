import { Command } from 'substance'

export default class SaveCommand extends Command {
  getCommandState (params) {
    // console.log('has changed', params.editorSession.hasDocumentChanged())
    // TODO: preserve this state so once set its not unset until document is saved
    return { disabled: !params.editorSession.hasDocumentChanged(), active: false }
  }
  execute (params, context) {
    console.log('params', params)
    console.log('context', context)
    const editor = params.editorSession.getEditor()
    editor.extendState({ edit: 'confirm' })
  }
}
