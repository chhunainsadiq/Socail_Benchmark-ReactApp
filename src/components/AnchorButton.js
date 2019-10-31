import styled, { css } from 'styled-components'
import { HoverStyle as baseHoverStyles } from '../config/commonStyles'

const HoverSyles = css`
  ${baseHoverStyles}
  color: White;
  text-decoration: none;
`
const AnchorButton = styled.a`
  background-color: ${props => props.theme.buttonBackground};
  padding: ${props => `${props.paddingVerticle} ${props.paddingHorizontal}`};
  border-radius: 0.3rem;
  color: white;
  text-decoration: none;
  &:hover {
    ${HoverSyles}
  }
  &:focus {
    ${HoverSyles}
  }
`
AnchorButton.defaultProps = {
  paddingHorizontal: '0.5rem',
  paddingVerticle: '0.5rem'
}

export default AnchorButton
