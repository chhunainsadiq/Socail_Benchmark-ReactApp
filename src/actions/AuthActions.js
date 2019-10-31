import { LoginURL, RegisterURL, FetchProfileURL } from '../config/urls'
import {
  AUTH_LOADING,
  SET_AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  UPDATE_PROFILE_DATA,
  UPDATE_AUTH_DATA,
  NEW_USER_CREATED,
  CLEAR_NEW_USER,
  LOGOUT_USER
} from './types'
import { makeRequest } from './request'
import { ToastsStore } from 'react-toasts'

export const loginUser = credentails => {
  return dispatch => {
    dispatch(startAuthLoadingSpinner())
    dispatch(clearAuthError())
    makeRequest({ requestType: 'post', url: LoginURL, data: credentails })
      .then(response => {
        console.log('login user response: ', response)
        ToastsStore.success('Login successfull')
        dispatch(updateAuthData(response.data))
        dispatch(fetchUserProfile(response.data.access))
      })
      .catch(error => {
        console.log('login user error: ', error)
        if (!error.response) {
          dispatch(
            setAuthError(
              'Network error, network connection or application server is down'
            )
          )
        } else if (error.response.data.detail) {
          dispatch(setAuthError(error.response.data.detail))
        } else {
          dispatch(setAuthError('Unexpected error occured, please try again'))
        }
      })
    dispatch(stopAuthLoadingSpinner())
  }
}

export const registerUser = credentails => {
  return dispatch => {
    dispatch(startAuthLoadingSpinner())
    dispatch(clearAuthError())
    makeRequest({
      requestType: 'post',
      url: RegisterURL,
      data: credentails
    })
      .then(response => {
        console.log('signup user response: ', response)
        if (response.statusText === 'Created') {
          dispatch(newUserCreated(response.data))
        }
      })
      .catch(error => {
        console.log('signup user error: ', error)
        if (!error.response) {
          dispatch(
            setAuthError(
              'Network error, Network error, check your internet connection or application server is down'
            )
          )
        } else if (error.response.data.username) {
          dispatch(setAuthError(error.response.data.username[0]))
        } else {
          dispatch(setAuthError('Unexpected error occured, please try again'))
        }
      })
    dispatch(stopAuthLoadingSpinner())
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: LOGOUT_USER })
  }
}
export const clearError = () => {
  return dispatch => {
    dispatch(clearAuthError())
  }
}

export const clearNewUser = () => {
  return dispatch => {
    dispatch(clearUser())
  }
}

const fetchUserProfile = token => {
  return dispatch => {
    makeRequest({ requestType: 'get', url: FetchProfileURL, token })
      .then(response => {
        console.log('fetch profile response: ', response)
        dispatch(updateProfileData(response.data.results[0]))
      })
      .catch(error => {
        console.log('fetch profile error: ', error)
      })
  }
}

const startAuthLoadingSpinner = () => {
  return { type: AUTH_LOADING, payload: true }
}

const stopAuthLoadingSpinner = () => {
  return { type: AUTH_LOADING, payload: false }
}

const updateAuthData = payload => {
  return { type: UPDATE_AUTH_DATA, payload }
}

const setAuthError = payload => {
  return { type: SET_AUTH_ERROR, payload }
}

const clearAuthError = () => {
  return { type: CLEAR_AUTH_ERROR }
}

const updateProfileData = payload => {
  return { type: UPDATE_PROFILE_DATA, payload }
}

const newUserCreated = payload => {
  return { type: NEW_USER_CREATED, payload }
}

const clearUser = () => {
  return { type: CLEAR_NEW_USER }
}
