import React, { useCallback, useEffect, useState } from 'react'
import {
  register_success_modal,
  login_modal,
  password_reset_modal,
  password_reset_request_modal,
  password_reset_request_sent_modal, edit_configuration_modal,
} from '../config/modal_path'
import { useDispatch, useSelector } from 'react-redux'
import {
  setActiveModal,
  setPageRoutePath,
} from '../store/actions/feedbackActions'
import { useHistory } from 'react-router'
import ConfirmationSentModal from '../components/auth/ConfirmationSentModal'
import jwt_decode from 'jwt-decode'
import { getAccessToken } from '../pages/auth/services/actions'
import PasswordResetRequest from '../pages/auth/resetPassword/PasswordResetRequest'
import PasswordResetRequestSent from '../pages/auth/resetPassword/PasswordResetRequestSent'
import PasswordResetModal from '../pages/auth/resetPassword/PasswordResetModal'
import EditConfigModal from "../components/scrapeConfig/EditConfigModal";


export const modals = {
  [register_success_modal]: ConfirmationSentModal,
  [password_reset_request_modal]: PasswordResetRequest,
  [password_reset_request_sent_modal]: PasswordResetRequestSent,
  [password_reset_modal]: PasswordResetModal,
  [edit_configuration_modal]: EditConfigModal,
}

function useModal() {
  const {
    auth: { isAuthenticated },
    feedback: { activeModal, pageRoute }
  } = useSelector(state => state)
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const onCloseModalHandler = useCallback(() => {
    dispatch(setActiveModal(''))
    dispatch(setPageRoutePath(''))
    setShowModal(false)
    setModal(null)
  }, [dispatch])

  useEffect(() => {
    let routeLogic = () => {
      let route = ''.concat(pageRoute)
      history.push(route)
      dispatch(setPageRoutePath(''))
      onCloseModalHandler()
    }

    if (isAuthenticated && pageRoute) {
      const decoded = jwt_decode(localStorage.jwtToken.split(' ')[1])
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        dispatch(getAccessToken()).then(() => {
          routeLogic()
        })
      } else routeLogic()
    } else if (!pageRoute) {
    } else dispatch(setActiveModal(login_modal))
  }, [isAuthenticated, pageRoute, dispatch, history, onCloseModalHandler])

  useEffect(() => {
    if (activeModal in modals) {
      setShowModal(true)
      let Modal = modals[activeModal]
      setModal(<Modal show={showModal} close={onCloseModalHandler} />)
    } else setModal(null)
  }, [activeModal, showModal, onCloseModalHandler])

  return [modal]
}

export default useModal
