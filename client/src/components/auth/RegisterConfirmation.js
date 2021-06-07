import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { registerRedirect } from '../../pages/auth/services/actions'
import { useDispatch, useSelector } from 'react-redux'
import { homePageRoute } from '../../config/routes'
import { setRegisterRedirectResponse } from '../../store/actions/feedbackActions'

function RegisterConfirmation() {

  const { confirmationToken } = useParams()
  const {
    auth: { isAuthenticated },
  } = useSelector(state => state)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (confirmationToken) {
      dispatch(registerRedirect('Bearer ' + confirmationToken))
    }
  }, [dispatch, confirmationToken])

  useEffect(() => {
    if (isAuthenticated) history.push(homePageRoute.path)
  }, [isAuthenticated, history])

  useEffect(() => {
    return () => {
      dispatch(setRegisterRedirectResponse({}))
    }
  }, [dispatch])

  return null
}

export default RegisterConfirmation
