import { Command } from 'substance'

export default class CloseCommand extends Command {
  getCommandState () {
    return { disabled: false }
  }
  execute (params, context) {
    const { editorSession } = params
    const editor = editorSession.getEditor()
    if (editorSession.hasUnsavedChanges()) {
      editor.send('hr:confirmClose')
    } else {
      context.archive.closeSession()
    }
  }
}
