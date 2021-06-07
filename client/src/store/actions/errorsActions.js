import { SET_ERRORS } from '../../config/actionTypes'
import { getAccessToken, logoutUser } from '../../pages/auth/services/actions'
import { setToastMessage } from './feedbackActions'

export const setErrors = (err, cb) => dispatch => {
  if (err.response) {
    switch (err.response.status) {
      case 401:
        err.response.data === 'jwt expired' ||
        err.response.data === 'Unauthorized'
          ? dispatch(getAccessToken(cb))
          : dispatch(logoutUser())
        break
      case 400:
        if (err.response.data.message) {
          if (err.response.data.message.hasOwnProperty('email')) {
            dispatch(
              setToastMessage({
                message: 'Invalid email address or password',
                isError: true
              })
            )
          }else if(err.response.data.short_message === 'GetPodcast' || err.response.data.short_message === 'getCustomerFromStripe'){
            break
          }else if (
            err.response.data.message.hasOwnProperty('password')
          ) {
            dispatch(
              setToastMessage({
                message: 'Invalid email address or password',
                isError: true
              })
            )
          } else
            dispatch(
              setToastMessage({
                message: err.response.data.short_message
                  ? err.response.data.short_message.toString() !==
                    '[object Object]'
                    ? err.response.data.short_message.toString()
                    : 'Error occurred'
                  : 'Error occurred',
                isError: true
              })
            )
        }
        dispatch(
          setErrorsAction(
            err.response.data ? err.response.data.message : err.response.data
          )
        )
        break
      default:
        return dispatch(setErrorsAction(err.response.data.message))
    }
  } else {
    dispatch({
      type: SET_ERRORS,
      payload: err
    })
  }
}

const setErrorsAction = err => dispatch => {
  return dispatch({ type: SET_ERRORS, payload: err ? err : {} })
}
