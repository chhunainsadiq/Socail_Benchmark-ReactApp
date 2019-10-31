import styled, { css } from 'styled-components'
import { Container as bootContainer, Form, Col } from 'react-bootstrap'

const HoverStyle = css`
  background-color: ${props => props.theme.buttonHover};
`
const InnerContainer = styled(Col)`
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`
const Container = styled(bootContainer)``
const FormInput = styled(Form.Control)``

export { HoverStyle, Container, FormInput, InnerContainer }
