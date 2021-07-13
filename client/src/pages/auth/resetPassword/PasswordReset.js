import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import isEmpty from 'lodash.isempty'
import { setActiveModal } from '../../../store/actions/feedbackActions'
import { setPasswordResetToken } from './services/actions'
import { landingPageRoute } from '../../../config/routes'
import { password_reset_modal } from '../../../config/modal_path'

function PasswordReset() {
  const { token } = useParams()
  const {
    auth: { isAuthenticated },
    passwordReset: { passwordResetToken }
  } = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    if (token) {
      dispatch(setPasswordResetToken(token))
    }
  }, [token, dispatch])

  useEffect(() => {
    if (!isEmpty(passwordResetToken)) {
      if (!isAuthenticated) {
        dispatch(setActiveModal(password_reset_modal))
      } else {
        history.push(landingPageRoute.path)
      }
    }
  }, [passwordResetToken, dispatch, isAuthenticated, history])

  return null
}

export default PasswordReset
