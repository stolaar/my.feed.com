import React, { useEffect } from 'react'
import Column from '../../../containers/layout/Column'
import Row from '../../../containers/layout/Row'
import { useHistory } from 'react-router-dom'
import { homePageRoute } from '../../../config/routes'
import useForm from '../../../hooks/useForm'
import { passwordResetRequest } from '../services/actions'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/modal/Modal'
import ModalHeading from '../../../components/common/ModalHeading'
import LoginButton from '../../../components/auth/login/LoginButton'
import './PasswordReset.css'
import { setActiveModal } from '../../../store/actions/feedbackActions'
import {
  login_modal,
  password_reset_request_sent_modal
} from '../../../config/modal_path'
import InputField from '../../../components/common/InputField'

function PasswordResetRequest({ show, close }) {
  const dispatch = useDispatch()
  const {
    auth: { isAuthenticated },
    errors,
    feedback: { responseMessage }
  } = useSelector(state => state)
  const history = useHistory()

  const sendPasswordResetRequest = () => {
    dispatch(passwordResetRequest(values.email))
  }

  const onBackClickHandler = () => {
    dispatch(setActiveModal(login_modal))
  }

  useEffect(() => {
    isAuthenticated && history.push(homePageRoute.path)
  }, [isAuthenticated, history])

  const { values, handleSubmit, handleChange } = useForm(
    { email: '' },
    sendPasswordResetRequest
  )

  useEffect(() => {
    if (responseMessage) {
      dispatch(setActiveModal(password_reset_request_sent_modal))
    }
  }, [responseMessage, dispatch])

  return (
    <Modal className="password-reset-modal" show={show} close={close}>
      <ModalHeading
        goBack={onBackClickHandler}
        className="password-reset-header"
        onClick={close}
        title="Sign-in"
      />
      <Row>
        <Column className="text-center align-items-center m-4" md={12} lg={12}>
          <div className="password-reset-heading">
            <h3>Where shall we send the re-set password link to?</h3>
          </div>
        </Column>
        <Column md={12} lg={12}>
          <form onSubmit={handleSubmit}>
            <InputField
              name="email"
              onChange={handleChange}
              label="E-mail address"
              value={values.email}
              error={errors.email}
            />

            <button
              style={{ display: 'none' }}
              type="submit"
              onSubmit={handleSubmit}
            />
            <LoginButton
              style={{ marginTop: '40px' }}
              text="Send"
              onClick={sendPasswordResetRequest}
            />
          </form>
        </Column>
      </Row>
    </Modal>
  )
}

export default PasswordResetRequest
