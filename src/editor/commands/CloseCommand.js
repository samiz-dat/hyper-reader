import { Command } from 'substance'

export default class CloseCommand extends Command {
  getCommandState () {
    return { disabled: false }
  }
  execute (params, context) {
    const { editorSession } = params
    const editor = editorSession.getEditor()
    if (editorSession.hasUnsavedChanges()) {
      editor.extendState({ edit: 'close' })
    } else {
      context.archive.closeSession()
    }
  }
}
