import { Component } from 'substance'

export default class Spinner extends Component {
  render ($$) {
    var el = $$('div')
      .addClass('table fixed vh-100 w-100 bg-black-70 top-0 z-max')
      .append(
        $$('div').addClass('table-cell v-mid tc').append($$('i').addClass('white faa fa-spinner fa-pulse f1'))
      )
    return el
  }
}
