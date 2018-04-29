import InsertNodeCommand from '../../commands/InsertNodeCommand'

class InsertNestCommand extends InsertNodeCommand {
  createNode (tx, params) {
    const nest = tx.create({
      type: 'nest'
    })
    const text = tx.createDefaultTextNode('Some test info')
    nest.show(text)
    return nest
  }
}

export default InsertNestCommand
