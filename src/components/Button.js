import styled from 'styled-components'
import { HoverStyle } from '../config/commonStyles'
import { Button as bootButton } from 'react-bootstrap'

const Button = styled(bootButton)`
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.buttonBackground};
  width: 100%;
  &:hover {
    ${HoverStyle}
  }
  &:focus {
    ${HoverStyle}
  }
`

export default Button
