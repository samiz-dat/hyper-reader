import { Component } from 'substance'
import Button from '../../editor/components/Button/Button'

export default class ListItem extends Component {
  render ($$) {
    let el = $$('div')
    const { key } = this.props
    el.append(
      $$('div').append('key:' + this.props.key),
      $$(Button, { text: 'Open', icon: 'edit', size: 'small' }).on('click', () => { this.send('hr:open', { key }) }),
      $$(Button, { icon: 'trash', size: 'small', status: 'secondary' }).on('click', () => { this.send('hr:remove', { key }) })
    )
    return el
  }
}
