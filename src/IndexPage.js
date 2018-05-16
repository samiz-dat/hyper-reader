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
        .addClass('pa3 tr')
        .append(
          $$(Button, { text: 'import', icon: 'key', status: 'secondary' }).on('click', () => this.send('hr:import')),
          $$(Button, { text: 'New', icon: 'plus-circle' }).on('click', () => this.send('hr:new'))
        )
    )
    if (list && list.length > 0) {
      list.forEach((item) => {
        el.append($$(ListItem, item))
      })
    } else {
      el.append('No Reading Lists')
    }
    return el
  }

  getConfigurator () {
    return this.configurator
  }
}
