import { Command } from 'substance'

export default class CloseCommand extends Command {
  getCommandState () {
    return { disabled: false }
  }
  execute (params, context) {
    console.log('close', params, context)
    // this.send('session:close')
  }

  // createNode (tx) { // eslint-disable-line
  //   throw new Error('This method is abstract')
  // }
}
