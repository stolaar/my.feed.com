import { SET_PASSWORD_RESET_TOKEN } from '../../../../config/actionTypes'
import { setErrors } from '../../../../store/actions/errorsActions'
import { reset_password_redirect_api } from '../../../../config/endpoints'
import axios from 'axios'
import { setResponseMessage } from '../../../../store/actions/feedbackActions'

export const setPasswordResetToken = token => dispatch => {
  dispatch({ type: SET_PASSWORD_RESET_TOKEN, payload: token })
}

export const resetPassword = (data, token) => async dispatch => {
  try {
    await axios.post(
      reset_password_redirect_api.path,
      { token, ...data },
      { headers: { authorization: `Bearer ${token}` } }
    )
    dispatch(setResponseMessage('Password reset success'))
  } catch (err) {
    dispatch(setErrors(err))
  }
}
