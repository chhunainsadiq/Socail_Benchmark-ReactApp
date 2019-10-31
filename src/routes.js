import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../src/components/Header/Header'
import {
  LoginScreen,
  SignupScreen,
  FbConnect,
  IgConnect,
  TwConnect,
  IgConnected,
  IgPageResults
} from './containers'
import { connect, useSelector } from 'react-redux'

const Routes = () => {
  const auth = useSelector(state => state.user.auth)
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        auth ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  )
  return (
    <BrowserRouter>
      {auth ? <Header /> : <div />}
      <Route path='/login' component={LoginScreen} />
      <Route path='/signup' component={SignupScreen} />
      <Route exact path='/' component={LoginScreen} />
      <Switch>
        <PrivateRoute path='/fbconnect' component={FbConnect} />
        <PrivateRoute path='/igconnect' component={IgConnect} />
        <PrivateRoute path='/twconnect' component={TwConnect} />
        <PrivateRoute path='/igconnected' component={IgConnected} />
        <PrivateRoute
          path='/igPageResults/:mediaId'
          component={IgPageResults}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default connect(
  null,
  {}
)(Routes)
