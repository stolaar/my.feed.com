import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setActiveModal,
  setPageRoutePath
} from '../store/actions/feedbackActions'
import { login_modal } from '../config/modal_path'
import { Redirect, useHistory } from 'react-router'
import { homePageRoute } from '../config/routes'

function AuthRedirectRoute({ to }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (to && !isAuthenticated) {
      dispatch(setPageRoutePath(to))
      dispatch(setActiveModal(login_modal))
    } else if (isAuthenticated) {
      dispatch(setPageRoutePath(''))
      dispatch(setActiveModal(''))
      history.location.pathname !== to && history.push(to)
    }
  }, [to, dispatch, history, isAuthenticated])

  return !isAuthenticated ? <Redirect to={homePageRoute.path} /> : null
}

export default AuthRedirectRoute
