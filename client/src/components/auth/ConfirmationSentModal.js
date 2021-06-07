import React from 'react'
import Modal from '../modal/Modal'
import { setActiveModal } from '../../store/actions/feedbackActions'
import { login_modal } from '../../config/modal_path'
import { useDispatch } from 'react-redux'

function ConfirmationSentModal({ close, show }) {
  const dispatch = useDispatch()

  const onLoginLinkClick = () => {
    dispatch(setActiveModal(login_modal))
  }

  return (
    <Modal className="text-center" close={close} show={show}>
      <h2>Confirmation link sent!</h2>
      <p>
        Go to your email and confirm your account by clicking the link, then you
        can{' '}
        <span onClick={onLoginLinkClick} className="modal-link">
          login
        </span>
      </p>
    </Modal>
  )
}

export default ConfirmationSentModal
