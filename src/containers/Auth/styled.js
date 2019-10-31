import styled from 'styled-components'
import { Col, Form as bootForm } from 'react-bootstrap'

const LoginColumn = styled(Col)`
  margin-top: 10%;
  border: 0.02rem ${props => props.theme.cardBorder} solid;
  border-radius: 0.1rem;
  padding: 5em 0em;
  background-color: ${props => props.theme.cardBackground};
`

const SwitchModeDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
  margin-top: 0.5rem;
`
const SwitchModeLink = styled.p`
  padding-left: 0.2em;
  color: blue;
  cursor: pointer;
`
const InputLable = styled.label``

const RequiredLabel = styled(InputLable)`
  ::after {
    content: ' *';
    color: red;
  }
`

const Form = styled(bootForm)`
  padding: 0em 1em;
`
const FormGroup = styled(bootForm.Group)``
const ButtonContainer = styled(Col)``
const Paragraph = styled.p``

export {
  LoginColumn,
  SwitchModeDiv,
  SwitchModeLink,
  RequiredLabel,
  Form,
  FormGroup,
  ButtonContainer,
  InputLable,
  Paragraph
}
