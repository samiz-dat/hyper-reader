import { Tool } from 'substance'
import Section from './Section'
import SectionConverter from './SectionConverter'
import SectionComponent from './SectionComponent'
import InsertSectionCommand from './InsertSectionCommand'

export default {
  name: 'section',
  configure: function (config) {
    config.addNode(Section)
    config.addComponent(Section.type, SectionComponent)
    config.addConverter('html', SectionConverter)
    config.addCommand('insert-section', InsertSectionCommand, { nodeType: 'section', commandGroup: 'insert-section' })
    config.addTool('insert-section', Tool)
    config.addIcon('insert-section', { 'fontawesome': 'fa-square' })
  }
}
