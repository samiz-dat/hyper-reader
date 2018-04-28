import { AbstractEditor, Toolbar, Highlights } from 'substance'

/**
  We extend from AbstractEditor which provides an abstract implementation
  that should be feasible for most editors.
*/
class Editor extends AbstractEditor {
  /*
    We render a toolbar, an editor for the body content
  */
  didMount () {
    let editorSession = this.getEditorSession()
    let doc = editorSession.getDocument()
    this.contentHighlights = new Highlights(doc)
    console.log('mounted viewer')
  }
  render ($$) {
    console.log('RENDER', this.doc.get('body'))
    let SplitPane = this.getComponent('split-pane')
    let el = $$('div').addClass('sc-simple-writer')
    let ScrollPane = this.getComponent('scroll-pane')
    let Overlay = this.getComponent('overlay')
    let ContextMenu = this.getComponent('context-menu')
    let Dropzones = this.getComponent('dropzones')
    let Body = this.getComponent('body')
        // console.log('manager', this.commandManager)
    let configurator = this.props.editorSession.getConfigurator()
    console.log(configurator)
    let contentPanel = $$(ScrollPane, {
      scrollbarPosition: 'right',
      highlights: this.contentHighlights
    }).append(
      $$(Body, {
        disabled: this.props.disabled,
        node: this.doc.get('body'),
        commands: configurator.getSurfaceCommandNames()
        // textTypes: configurator.getTextTypes()
      }).ref('body'),
      $$(Overlay, {
        toolPanel: configurator.getToolPanel('main-overlay'),
        theme: 'dark'
      }),
      $$(ContextMenu, {
        toolPanel: configurator.getToolPanel('context-menu'),
        theme: 'dark'
      }),
      $$(Dropzones)
    ).ref('contentPanel')

    el.append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        $$('div').addClass('se-toolbar-wrapper').append(
          $$(Toolbar, {
            toolPanel: configurator.getToolPanel('toolbar')
          }).ref('toolbar')
        ),
        contentPanel
      )
    )
    return el
  }
}

export default Editor
