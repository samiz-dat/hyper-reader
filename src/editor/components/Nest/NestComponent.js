import { Component, ContainerEditor } from 'substance'

class NestComponent extends Component {
  getInitialState () {
    return {
      loading: true
    }
  }

  didMount () {
    console.log('mounted', this.props.node.id)
    setTimeout(() => {
      this.extendState({
        loading: false
      })
    }, 1000)
  }

  dispose () {
    console.log('disposed', this.props.node.id)
  }

  render ($$) {
    // console.log('CONTEXT', this.context)
    let configurator = this.context.editorSession.getConfigurator()
    let el
    el = $$('div')
      .addClass('sc-nest')
      .attr('data-id', this.props.node.id)
    if (this.state.loading) {
      el.addClass('sc-nest-loading')
    } else {
      let node = this.props.node
      el.append(
        $$(ContainerEditor, {
          // disabled: this.props.disabled,
          node: node,
          commands: configurator.getSurfaceCommandNames(),
          // textTypes: configurator.getTextTypes()
        }).ref('editor')
      )
    }
    return el
  }
}

export default NestComponent
