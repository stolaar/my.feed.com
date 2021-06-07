import React from 'react'
import Modal from '../../../components/modal/Modal'
import ModalHeading from '../../../components/common/ModalHeading'
import Column from '../../../containers/layout/Column'
import LoginButton from '../../../components/auth/login/LoginButton'
import Row from '../../../containers/layout/Row'

function PasswordResetRequestSent({ show, close }) {
  return (
    <Modal className="password-request-sent-modal" show={show} close={close}>
      <ModalHeading
        className="password-request-sent-modal-header"
        onClick={close}
        title="Log-in"
      />
      <Row>
        <Column className="text-center align-items-center m-4" md={12} lg={12}>
          <div className="password-request-sent-heading">
            <h3>Sent. Check your inbox.</h3>
          </div>
        </Column>
        <Column className="text-center" md={12} lg={12}>
          <p className="password-request-sent-p">
            Follow the instructions in the e-mail and you’ll be able to book and
            order again in no time.
          </p>
          <LoginButton
            style={{ marginBottom: '30px' }}
            text="Close"
            onClick={close}
          />
        </Column>
      </Row>
    </Modal>
  )
}

export default PasswordResetRequestSent
