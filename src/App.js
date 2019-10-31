import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './configureStore'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts'
import { ThemeProvider } from 'styled-components'
import { theme } from './config/theme'

const store = configureStore()
store.subscribe(() => {
  let currentState = store.getState()
  if (currentState.user.auth) {
    localStorage.setItem('auth', JSON.stringify(currentState.user.auth))
  } else localStorage.removeItem('auth')
})

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <Routes />
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.BOTTOM_LEFT}
          />
        </Fragment>
      </ThemeProvider>
    </Provider>
  )
}

export { App }
