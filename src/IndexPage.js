import { Component } from 'substance'
import Button from './editor/components/Button/Button'
import ListItem from './ui/components/ListItem'

export default class IndexPage extends Component {
  // constructor (...args) {
  //   super(...args)
  // }
  render ($$) {
    const { list } = this.props
    let el = $$('div')
      .addClass('hr-reader-index')
      .ref('list-container')
    el.append(
      $$('div')
        .addClass('pa3 tr mw-main center')
        .append(
          $$('h1').append('HyperReadings').addClass('f1 serif'),
          $$('p').append('Create and share reading lists with your bestest friends.').addClass('f3 serif'),
          $$(Button, { text: 'import', icon: 'key', status: 'secondary' }).on('click', () => this.send('hr:import')),
          $$(Button, { text: 'New', icon: 'plus-circle' }).on('click', () => this.send('hr:new'))
        )
    )
    const readings = $$('ul')
      .addClass('mw-main center')
      .ref('list')
    if (list && list.length > 0) {
      readings.append(list.map((item, i) => $$(ListItem, item).ref(`list-item-${i}`)))
    } else {
      readings.append($$('li').append('No Reading Lists'))
    }
    el.append(readings)
    return el
  }

  getConfigurator () {
    return this.configurator
  }
}
