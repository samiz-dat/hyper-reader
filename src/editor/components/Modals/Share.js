import { Component } from 'substance'

export default class Share extends Component {
  render ($$) {
    var el = $$('div').append('simply share this key' + this.props.key)
    return el
  }
}
