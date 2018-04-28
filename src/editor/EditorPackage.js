import {
  BasePackage as SubstanceBasePackage,
  // SwitchTextTypePackage,
  ParagraphPackage,
  HeadingPackage,
  CodeblockPackage,
  StrongPackage,
  EmphasisPackage,
  LinkPackage
} from 'substance'

import Editor from './components/Editor/Editor'
import HyperReaderArticlePackage from '../article/HyperReaderArticlePackage'
import BodyPackage from './components/Body/BodyPackage'
import CommentPackage from './components/Comment/CommentPackage'
import NestPackage from './components/Nest/NestPackage'

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
  config.import(CodeblockPackage)
  config.import(StrongPackage, {toolGroup: 'annotations'})
  config.import(EmphasisPackage, {toolGroup: 'annotations'})
  config.import(LinkPackage, {toolGroup: 'annotations'})

  // custom nodes
  config.import(BodyPackage)
  config.import(CommentPackage, {toolGroup: 'annotations'})
  config.import(NestPackage)

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
      commandGroups: ['insert-nest']
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
