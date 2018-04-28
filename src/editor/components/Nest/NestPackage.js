import { Tool } from 'substance'
import Nest from './Nest'
import NestConverter from './NestConverter'
import NestComponent from './NestComponent'
import InsertNestCommand from './InsertNestCommand'

export default {
  name: 'nest',
  configure: function (config) {
    config.addNode(Nest)
    config.addComponent(Nest.type, NestComponent)
    config.addConverter('html', NestConverter)
    config.addCommand('insert-nest', InsertNestCommand, { nodeType: 'nest', commandGroup: 'insert-nest' })
    config.addTool('insert-nest', Tool)
    config.addIcon('insert-nest', { 'fontawesome': 'fa-align-justify' })
  }
}
