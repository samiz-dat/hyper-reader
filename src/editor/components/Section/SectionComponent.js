import { Component, ContainerEditor } from 'substance'

class SectionComponent extends Component {
  render ($$) {
    let configurator = this.context.editorSession.getConfigurator()
    let el = $$('div')
      .attr('data-id', this.props.node.id)
    let node = this.props.node
    el.append(
      $$(ContainerEditor, {
        disabled: this.context.disabled,
        node: node,
        commands: configurator.getSurfaceCommandNames()
      }).ref('section-editor')
    )
    return el
  }
}

export default SectionComponent
