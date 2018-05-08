import { Component } from 'substance'
import ListItem from './ui/components/ListItem'
export default class IndexPage extends Component {
  // constructor (...args) {
  //   super(...args)
  // }
  render ($$) {
    const { list, onNew } = this.props
    let el = $$('div').addClass('hr-reader-index')
    el.append(
      $$('div')
        .addClass('sg-actions').append(
          $$('button')
            .addClass('sc-button sm-style-big')
            .append('New')
            .on('click', onNew),
          $$('button')
            .addClass('sc-button sm-style-big sm-secondary')
            .append('Cancel')
            .on('click', () => { console.log('cancel') })
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
