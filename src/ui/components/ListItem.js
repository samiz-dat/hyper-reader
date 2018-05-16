import { Component } from 'substance'
import Button from '../../editor/components/Button/Button'

export default class ListItem extends Component {
  render ($$) {
    const { key, title, folder } = this.props
    let el = $$('div').addClass('pa3')
    el.append(
      $$('div').addClass('sans f6 fw700').append(title || 'untitled'),
      $$('div').addClass('mono f7').append(key),
      $$(Button, { text: 'Open', icon: 'edit', size: 'small' }).on('click', () => { this.send('hr:open', { key }) }),
      $$(Button, { text: 'Show', icon: 'folder', size: 'small', status: 'secondary' }).on('click', () => { this.send('hr:reveal', { folder }) }),
      $$(Button, { icon: 'trash', size: 'small', status: 'secondary' }).on('click', () => { this.send('hr:remove', { key }) })
    )
    return el
  }
}
