import InsertNodeCommand from '../../commands/InsertNodeCommand'

class InsertSectionCommand extends InsertNodeCommand {
  getCommandState (params, context) {
    const newState = super.getCommandState(params, context)
    if (!context.archive.isEditable()) {
      newState.disabled = true
    }
    return newState
  }

  createNode (tx, params) {
    const section = tx.create({
      type: 'section'
    })
    const text = tx.createDefaultTextNode('[ add content here ]')
    section.show(text)
    return section
  }
}

export default InsertSectionCommand
