import { Component } from 'substance'

export default class ListItem extends Component {
  render ($$) {
    let el = $$('div')
    const { key } = this.props
    el.append(
      $$('div').append('key:' + this.props.key),
      $$('button').addClass('hr-button a-inline').append('open').on('click', () => { this.send('hr:open', { key }) }),
      $$('button').addClass('hr-button sm-secondary a-inline').append('delete').on('click', () => { this.send('hr:remove', { key }) })
    )
    return el
  }
}
