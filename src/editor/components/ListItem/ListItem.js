import { Component } from 'substance'
import Button from '../Button/Button'

export default class ListItem extends Component {
  getInitialState () {
    return {
      title: 'untitled',
      percent: 0,
      authorised: false
    }
  }
  didMount () {
    const info = this.context.archive.get(this.props.key)
    this.setState({
      title: info.title,
      percent: info.size.totalPercentage || 0,
      authorised: info.authorised
    })
    if (info.size.totalPercentage < 100) {
      this.timer = setInterval(this._update.bind(this), 200)
    }
  }
  dispose () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
  _update () {
    const { title, percent, authorised } = this.state
    const info = this.context.archive.get(this.props.key)
    const newState = {
      title: info.title,
      percent: info.size.totalPercentage,
      authorised: info.authorised
    }
    if (title !== newState.title || percent !== newState.percent || authorised !== newState.authorised) {
      this.setState(newState)
    }
    if (info.size.totalPercentage === 100) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
  _open () {
    const { key } = this.props
    this.send('hr:open', { key })
  }

  _remove () {
    const { key } = this.props
    this.send('hr:remove', { key })
  }

  _reveal () {
    const { folder } = this.props
    this.send('hr:reveal', { folder })
  }

  _share () {
    const { key } = this.props
    this.send('hr:share', { key })
  }

  _options ($$, downloading) {
    const options = []
    if (!downloading) {
      options.push(
        $$(Button, { text: 'Open', icon: 'edit', size: 'small' })
          .on('click', this._open.bind(this)),
        $$(Button, { text: 'Share', icon: 'share-alt-square', size: 'small', status: 'secondary' })
          .on('click', this._share.bind(this))
      )
    }
    // $$(Button, { text: 'Show', icon: 'folder', size: 'small', status: 'secondary' }).on('click', () => { this.send('hr:reveal', { folder }) }),
    options.push(
      // $$(Button, { text: 'Show', icon: 'folder', size: 'small', status: 'secondary' })
      //   .on('click', this._reveal.bind(this)),
      $$(Button, { icon: 'trash', size: 'small', status: 'secondary' })
        .on('click', this._remove.bind(this)).ref('trash-button')
    )
    return $$('div')
      .addClass('nowrap')
      .append(options)
      .ref('buttons')
  }

  render ($$) {
    const { key } = this.props
    const { title, percent, authorised } = this.state
    const downloading = percent !== 100
    const opacity = (percent / 100) * 0.8
    let el = $$('li')
      .addClass('pb4')
      .attr({
        style: `opacity: ${0.8 + opacity}`
      })
      .ref('li' + this.props.key)
    el.append(
      $$('div')
        .addClass('flex flex-row space-between align-center')
        .append(
          $$('div').addClass('sans f3 fw700').append(title || key),
          this._options($$, downloading)
        ).ref('button-group'),
      $$('div')
        .addClass('bb b--dark-blue bw2')
        .attr({ style: `width: ${percent.toFixed(2)}%` })
        .ref('progress'),
      // $$('div').addClass('readingList__stats').append(
      //   $$('span').append('Peers:' + hr.network.connections.length),
      //   $$('span').append('Upload:' + speed.uploadSpeed),
      //   $$('span').append('Download:' + speed.downloadSpeed),
      //   $$('span').append('percentage:' + size.totalPercentage + '/' + size.empty),
      //   $$('span').append('can edit:' + authorised)
      // ),
      $$('div').addClass('mono f7').append(key).ref('key')
    )
    return el
  }
}
