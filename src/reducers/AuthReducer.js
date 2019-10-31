import {
  AUTH_LOADING,
  SET_AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  UPDATE_AUTH_DATA,
  UPDATE_PROFILE_DATA,
  NEW_USER_CREATED,
  CLEAR_NEW_USER,
  LOGOUT_USER
} from '../actions/types'
const INITIAL_STATE = {
  auth: null,
  profile: {},
  newUser: null,
  loading: false,
  errorMessage: ''
}
INITIAL_STATE.auth = JSON.parse(localStorage.getItem('auth'))

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      INITIAL_STATE.auth = null
      return INITIAL_STATE
    case AUTH_LOADING:
      return { ...state, loading: action.payload }
    case SET_AUTH_ERROR:
      return { ...state, errorMessage: action.payload }
    case CLEAR_AUTH_ERROR:
      return { ...state, errorMessage: '' }
    case UPDATE_PROFILE_DATA:
      return { ...state, profile: action.payload }
    case UPDATE_AUTH_DATA:
      return { ...state, auth: action.payload }
    case NEW_USER_CREATED:
      return { ...state, newUser: action.payload }
    case CLEAR_NEW_USER:
      return { ...state, newUser: null }
    default:
      return { ...state }
  }
}

export { AuthReducer }
