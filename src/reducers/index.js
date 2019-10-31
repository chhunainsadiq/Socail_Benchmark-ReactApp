import { AuthReducer } from './AuthReducer'
import { DataReducer } from './DataReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: AuthReducer,
  data: DataReducer
})

export { rootReducer }
