import { AbstractEditor, Toolbar, Highlights } from 'substance'
import Modal from '../Modal/Modal'
import Confirm from '../Confirm/Confirm'
import Form from '../Form/Form'
import SimpleInput from '../SimpleInput/SimpleInput'
/**
  We extend from AbstractEditor which provides an abstract implementation
  that should be feasible for most editors.
*/
class Editor extends AbstractEditor {
  /*
    We render a toolbar, an editor for the body content
  */
  didMount () {
    super.didMount()
    let editorSession = this.getEditorSession()
    // attach editor to enable forced rerenders
    let doc = editorSession.getDocument()
    this.contentHighlights = new Highlights(doc)
    console.log('mounted viewer', this.state)
    this.handleActions({
      closeModal: () => { this.extendState({ showModal: false }) }
    })
  }

  getInitialState () {
    return { showModal: false }
  }

  _renderToolPanel ($$) {
    let configurator = this.props.editorSession.getConfigurator()
    return $$('div').addClass('se-toolbar-wrapper')
      .append(
        $$(Toolbar, {
          toolPanel: configurator.getToolPanel('toolbar')
        }).ref('toolbar')
      )
  }

  _renderContentPanel ($$) {
    let configurator = this.props.editorSession.getConfigurator()
    let ScrollPane = this.getComponent('scroll-pane')
    let Overlay = this.getComponent('overlay')
    let ContextMenu = this.getComponent('context-menu')
    let Dropzones = this.getComponent('dropzones')
    let Body = this.getComponent('body')

    return $$(ScrollPane, {
      scrollbarPosition: 'right',
      highlights: this.contentHighlights
    }).append(
      $$(Body, {
        disabled: this.props.disabled,
        node: this.doc.get('body'),
        commands: configurator.getSurfaceCommandNames()
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
  }

  _renderModal ($$, type) {
    var modal = $$(Modal, {
      width: 'small',
      textAlign: 'center',
      title: type === 'saveNew' ? 'Save New Reading List' : undefined
    })
    if (type === 'close') {
      const confirm = $$(Confirm, {
        onConfirm: () => { this.context.archive.closeSession() }
      })
      confirm.append('You have unsaved changes! Are you sure you want to quit?')
      modal.append(confirm)
    } else if (type === 'saveNew') {
      const form = $$(Form, { onSubmit: (data) => {
        // create new document then save
        this.extendState({ showModal: false })
        this.context.archive.createEmptyReadingList(data.name)
          .then(() => this.getEditorSession().save())
      }})
      form.append($$(SimpleInput, { label: 'Name', name: 'name' }))
      modal.append(form)
    }
    return modal
  }

  render ($$) {
    console.log('--- render editor ---', this.state)
    const { showModal } = this.state
    let SplitPane = this.getComponent('split-pane')
    let el = $$('div').addClass('sc-editor')
    el.append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        this._renderToolPanel($$),
        this._renderContentPanel($$)
      )
    )
    if (showModal) {
      var modal = this._renderModal($$, showModal)
      el.append(modal)
    }
    return el
  }
}

export default Editor
