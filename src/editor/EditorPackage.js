import {
  BasePackage as SubstanceBasePackage,
  // SwitchTextTypePackage,
  ParagraphPackage,
  HeadingPackage,
  ListPackage,
  StrongPackage,
  EmphasisPackage,
  LinkPackage
} from 'substance'

import Editor from './components/Editor/Editor'
import HyperReaderArticlePackage from '../article/HyperReaderArticlePackage'
import BodyPackage from './components/Body/BodyPackage'
import CommentPackage from './components/Comment/CommentPackage'
import SectionPackage from './components/Section/SectionPackage'
import SaveCommand from './commands/SaveCommand'
import CloseCommand from './commands/CloseCommand'

function configure (config) {
  config.import(HyperReaderArticlePackage)
  // BasePackage provides core functionality, such as undo/redo
  // and the SwitchTextTypeTool. However, you could import those
  // functionalities individually if you need more control
  config.import(SubstanceBasePackage)
  // config.import(SwitchTextTypePackage)
  // core nodes
  config.import(ParagraphPackage)
  config.import(HeadingPackage)
  config.import(ListPackage)
  config.import(StrongPackage, {toolGroup: 'annotations'})
  config.import(EmphasisPackage, {toolGroup: 'annotations'})
  config.import(LinkPackage, {toolGroup: 'annotations'})

  // custom nodes
  config.import(BodyPackage)
  config.import(CommentPackage)
  config.import(SectionPackage)

  config.addCommand('save-command', SaveCommand, { commandGroup: 'editor-options' })
  config.addLabel('save-command', 'Save')
  config.addIcon('save-command', { 'fontawesome': 'fa-save' })
  config.addKeyboardShortcut('CommandOrControl+s', { command: 'save-command' })
  config.addCommand('close', CloseCommand, { commandGroup: 'editor-options' })
  config.addLabel('close', 'Close')
  config.addIcon('close', { 'fontawesome': 'fa-times-circle' })
  config.addKeyboardShortcut('CommandOrControl+w', { command: 'close' })

  config.addToolPanel('toolbar', [
    {
      name: 'undo-redo',
      type: 'tool-group',
      showDisabled: true,
      style: 'minimal',
      commandGroups: ['undo-redo']
    },
    {
      name: 'text-types',
      type: 'tool-dropdown',
      showDisabled: false,
      style: 'descriptive',
      commandGroups: ['text-types']
    },
    {
      name: 'list',
      type: 'tool-group',
      showDisabled: true,
      style: 'minimal',
      commandGroups: ['list']
    },
    {
      name: 'annotations',
      type: 'tool-group',
      showDisabled: true,
      style: 'minimal',
      commandGroups: ['formatting-primary', 'formatting', 'annotations']
    },
    {
      name: 'additional-tools',
      type: 'tool-group',
      showDisabled: true,
      style: 'minimal',
      commandGroups: ['insert-section']
    },
    {
      name: 'options',
      type: 'tool-group',
      showDisabled: true,
      style: 'descriptive',
      commandGroups: ['editor-options']
    }
  ])
  config.addToolPanel('main-overlay', [
    {
      name: 'prompt',
      type: 'tool-prompt',
      showDisabled: false,
      commandGroups: ['prompt']
    }
  ])

  config.addToolPanel('context-menu', [
    {
      name: 'context-menu',
      type: 'tool-group',
      showDisabled: false,
      style: 'descriptive',
      commandGroups: ['table-modifiers']
    }
  ])
}

export default {
  name: 'author',
  configure,
  Editor
}
