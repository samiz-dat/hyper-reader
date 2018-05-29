import { AnnotationCommand } from 'substance'

/**
  Command implementation used for creating, expanding and
  truncating comments.
  Fusion and deletion are disabled as these are handled by EditCommentTool.
*/
class CommentCommand extends AnnotationCommand {
  canFuse () { return false }
  canDelete () { return false }

  executeCreate (params) {
    let result = super.executeCreate(params)
    let editorSession = this._getEditorSession(params)
    editorSession.transaction((tx) => {
      tx.setSelection(tx.selection.collapse())
    })
    return result
  }
}

export default CommentCommand
