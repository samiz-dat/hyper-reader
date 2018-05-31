import { Component } from 'substance'
import Button from '../Button/Button'

export default class Share extends Component {
  render ($$) {
    var el = $$('div').append(
      'Share this unique key with a friend to allow them to download this reading list.',
      $$('div').addClass('mono f5 break-all fw900 bg-light-gray br2 pa2 mv3').append(this.props.key).ref('key'),
      // $$(Button, { text: 'Copy to Clipboard' }).addClass('a-block center mb3').on('click', this._copy.bind(this)),
      'Anyone with this key will be able to access the reading lists.'
    )
    return el
  }
}
