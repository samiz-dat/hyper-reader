import { Component } from 'substance'
import Button from './editor/components/Button/Button'
import ListItem from './ui/components/ListItem'

export default class IndexPage extends Component {
  // constructor (...args) {
  //   super(...args)
  // }
  render ($$) {
    const { list } = this.props
    let el = $$('div').addClass('hr-reader-index')
    el.append(
      $$('div')
        .addClass('pa3 tr mw-main center')
        .append(
          $$(Button, { text: 'import', icon: 'key', status: 'secondary' }).on('click', () => this.send('hr:import')),
          $$(Button, { text: 'New', icon: 'plus-circle' }).on('click', () => this.send('hr:new'))
        )
    )
    const readings = $$('div')
      .addClass('mw-main center')
    if (list && list.length > 0) {
      readings.append(list.map(item => $$(ListItem, item)))
    } else {
      readings.append('No Reading Lists')
    }
    el.append(readings)
    return el
  }

  getConfigurator () {
    return this.configurator
  }
}
