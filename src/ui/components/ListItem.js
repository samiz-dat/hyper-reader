import { Component } from 'substance'

export default class ListItem extends Component {
  render ($$) {
    let el = $$('div')
    el.append('key' + this.props.key)
    return el
  }
}
