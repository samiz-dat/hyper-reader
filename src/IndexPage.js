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
        .addClass('mw-main center')
        .append(
          $$('h1').append('HyperReadings').addClass('serif pt4 f2'),
          $$('p').append('Create and share reading lists with your bestest friends.').addClass('f3 mb4 serif')
        ),
      $$('div')
        .addClass('mw-main center tc pb5')
        .append(
          $$(Button, { text: 'New', icon: 'plus-circle' }).on('click', () => this.send('hr:new')),
          $$(Button, { text: 'Import', icon: 'key', status: 'secondary' }).on('click', () => this.send('hr:import'))
        )
    )
    const readings = $$('ul')
      .addClass('mw-main center listOfLists pa0')
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
