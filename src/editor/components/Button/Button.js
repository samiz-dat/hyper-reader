import { Component } from 'substance'

const colorMap = {
  primary: 'white bg-blue hover-bg-dark-blue',
  secondary: 'white bg-gray hover-bg-mid-gray'
}

const sizeMap = {
  small: 'pv1 ph2 f7 br4',
  medium: 'pv1 ph3 f6 br4 fw500',
  large: 'pv2 ph3 f5 br4 fw500'
}

export default class Button extends Component {
  render ($$) {
    const { text, icon, type, status, size } = this.props
    const colors = colorMap[status || 'primary']
    const sizeStyle = sizeMap[size || 'medium']
    const iconPadding = text ? (size === 'small' ? 'pr1' : 'pr2') : ''
    const el = $$('button')
      .attr({ type })
      .addClass(`a-inline sans mh1 ${sizeStyle} ${colors}`)
    const i = icon && $$('i').addClass(`${iconPadding} fa fa-${icon}`)
    el.append(i, text)
    return el
  }
}
