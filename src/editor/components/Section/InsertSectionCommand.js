import InsertNodeCommand from '../../commands/InsertNodeCommand'

class InsertSectionCommand extends InsertNodeCommand {
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
