import React, { useState, useEffect } from 'react'
import {
  registerUser,
  clearError,
  clearNewUser
} from '../../actions/AuthActions'
import { connect, useSelector } from 'react-redux'
import { validateEmail } from '../../config/utils'
import { ToastsStore } from 'react-toasts'
import Button from '../../components/Button'
import { Container, FormInput } from '../../config/commonStyles'
import {
  LoginColumn,
  SwitchModeDiv,
  SwitchModeLink,
  RequiredLabel,
  Form,
  FormGroup,
  ButtonContainer,
  InputLable,
  Paragraph
} from './styled'
import { newUserSelector, errorMsgSelector } from '../../selectors/index'

const Signup = ({ history, registerUser, clearError, clearNewUser }) => {
  // local state
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // redux state selectors
  const state = useSelector(state => state)
  const errorMessage = errorMsgSelector(state)
  const newUser = newUserSelector(state)
  useEffect(
    () => {
      if (newUser) {
        ToastsStore.success(
          'Account created successfully, login and start using now!'
        )
        history.push('/login')
        clearNewUser()
      }
    },
    [newUser] // eslint-disable-line
  )
  if (errorMessage.length !== 0) {
    ToastsStore.error(errorMessage)
    setPassword('')
    clearError()
  }
  // local helper methods
  const handleSignupBtnClick = () => {
    if (username.trim().length === 0) {
      ToastsStore.error('username can not be empty')
      setPassword('')
    } else if (email.trim().length !== 0 && !validateEmail(email.trim())) {
      ToastsStore.error('Invalid Email address format')
      setPassword('')
    } else if (password.trim().length === 0) {
      ToastsStore.error('password can not be empty')
    } else if (password.trim().length < 4) {
      ToastsStore.error('minimum password length is 5')
      setPassword('')
    } else {
      registerUser({ username: username, email: email, password: password })
    }
  }
  const handleTextInputChange = event => {
    if (event.target.id === 'inputUsername') {
      setUsername(event.target.value)
    } else if (event.target.id === 'inputEmail') {
      setEmail(event.target.value)
    } else if (event.target.id === 'inputPassword') {
      setPassword(event.target.value)
    }
  }
  return (
    <Container>
      <LoginColumn sm={{ span: 5, offset: 4 }}>
        <Form>
          <FormGroup>
            <RequiredLabel htmlFor='inputUsername'>Username</RequiredLabel>
            <FormInput
              type='text'
              value={username}
              id='inputUsername'
              placeholder='Enter Username'
              onChange={handleTextInputChange}
            />
          </FormGroup>
          <FormGroup>
            <InputLable htmlFor='inputEmail'>Email address</InputLable>
            <FormInput
              type='email'
              value={email}
              id='inputEmail'
              placeholder='Enter email'
              onChange={handleTextInputChange}
            />
          </FormGroup>
          <FormGroup>
            <RequiredLabel htmlFor='inputPassword'>Password</RequiredLabel>
            <FormInput
              type='password'
              value={password}
              id='inputPassword'
              placeholder='Password'
              onChange={handleTextInputChange}
            />
          </FormGroup>
        </Form>
        <ButtonContainer sm={{ span: 6, offset: 3 }}>
          <Button type='submit' onClick={() => handleSignupBtnClick()}>
            Signup
          </Button>
        </ButtonContainer>
        <SwitchModeDiv>
          <Paragraph>Already have an account?</Paragraph>
          <SwitchModeLink onClick={() => history.push('/login')}>
            Login
          </SwitchModeLink>
        </SwitchModeDiv>
      </LoginColumn>
    </Container>
  )
}

export default connect(
  null,
  { registerUser, clearError, clearNewUser }
)(Signup)
