import { Component } from 'substance'
import Button from '../../editor/components/Button/Button'

export default class ListItem extends Component {
  render ($$) {
    const { key, title, folder, speed, size, hr, authorised } = this.props
    let el = $$('li')
      .addClass('pa3')
      .ref('li')
    el.append(
      $$('div').addClass('sans f6 fw700').append(title || 'untitled'),
      $$('div').addClass('').append(
        $$('span').append('Peers:' + hr.network.connections.length),
        $$('span').append('Upload:' + speed.uploadSpeed),
        $$('span').append('Download:' + speed.downloadSpeed),
        $$('span').append('percentage:' + size.totalPercentage + '/' + size.empty),
        $$('span').append('can edit:' + authorised)
      ),
      $$('div').addClass('mono f7').append(key).ref('key'),
      $$(Button, { text: 'Open', icon: 'edit', size: 'small' }).on('click', () => { this.send('hr:open', { key }) }),
      $$(Button, { text: 'Show', icon: 'folder', size: 'small', status: 'secondary' }).on('click', () => { this.send('hr:reveal', { folder }) }),
      $$(Button, { icon: 'trash', size: 'small', status: 'secondary' }).on('click', () => { this.send('hr:remove', { key }) })
    )
    return el
  }
}
