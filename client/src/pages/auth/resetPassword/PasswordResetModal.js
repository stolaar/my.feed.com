import React, { useEffect } from 'react'
import Column from '../../../containers/layout/Column'
import Row from '../../../containers/layout/Row'
import { useHistory } from 'react-router-dom'
import { loginPageRoute } from '../../../config/routes'
import useForm from '../../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/modal/Modal'
import ModalHeading from '../../../components/common/ModalHeading'
import LoginButton from '../../../components/auth/login/LoginButton'
import './PasswordReset.css'
import { setActiveModal } from '../../../store/actions/feedbackActions'
import { login_modal } from '../../../config/modal_path'
import InputField from '../../../components/common/InputField'
import { resetPassword } from './services/actions'

function PasswordResetModal({ show, close }) {
  const dispatch = useDispatch()
  const {
    auth: { isAuthenticated },
    errors,
    passwordReset: { passwordResetToken },
    feedback: { responseMessage }
  } = useSelector(state => state)
  const history = useHistory()

  const sendPasswordResetRequest = () => {
    dispatch(resetPassword(values, passwordResetToken))
    history.push('home')
  }

  useEffect(() => {
    isAuthenticated && history.push(loginPageRoute.path)
  }, [isAuthenticated, history])

  const { values, handleSubmit, handleChange } = useForm(
    { password: '', password2: '' },
    sendPasswordResetRequest
  )

  useEffect(() => {
    if (responseMessage) {
      dispatch(setActiveModal(login_modal))
    }
  }, [responseMessage, dispatch])

  return (
    <Modal
      className="password-reset-modal password-redirect"
      show={show}
      close={close}
    >
      <ModalHeading
        className="password-reset-header"
        onClick={close}
        title="Sign-in"
      />
      <Row>
        <Column className="text-center align-items-center m-4" md={12} lg={12}>
          <div className="password-reset-heading">
            <h3>Please enter your new password</h3>
          </div>
        </Column>
        <Column md={12} lg={12}>
          <form onSubmit={handleSubmit}>
            <InputField
              name="password"
              type="password"
              onChange={handleChange}
              label="New password"
              value={values.password}
              error={errors.password}
            />
            <InputField
              name="password2"
              type="password"
              onChange={handleChange}
              label="Re-type password"
              value={values.password2}
              error={errors.password2}
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

export default PasswordResetModal
