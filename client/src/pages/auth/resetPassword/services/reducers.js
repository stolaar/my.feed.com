import { SET_PASSWORD_RESET_TOKEN } from '../../../../config/actionTypes'

const initialState = {
  passwordResetToken: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSWORD_RESET_TOKEN:
      return { ...state, passwordResetToken: action.payload }
    default:
      return state
  }
}

export default reducer
