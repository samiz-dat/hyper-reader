import { Component } from 'substance'

export default class ListItem extends Component {
  render ($$) {
    let el = $$('div')
    const { key } = this.props
    el.append(
      $$('div').append('key:' + this.props.key),
      $$('button').addClass('sc-button a-inline').append('open').on('click', () => { this.send('hr:open', { key }) }),
      $$('button').addClass('sc-button sm-secondary a-inline').append('delete').on('click', () => { this.send('hr:remove', { key }) })
    )
    return el
  }
}
