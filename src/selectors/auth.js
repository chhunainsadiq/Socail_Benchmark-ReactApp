import { createSelector } from 'reselect'

const userSelector = state => state.user

const authSelector = createSelector(
  userSelector,
  user => user.auth
)

const errorMsgSelector = createSelector(
  userSelector,
  user => user.errorMessage
)
const newUserSelector = createSelector(
  userSelector,
  user => user.newUser
)

const tokenSelector = createSelector(
  authSelector,
  auth => auth.access
)

export {
  userSelector,
  authSelector,
  tokenSelector,
  errorMsgSelector,
  newUserSelector
}
