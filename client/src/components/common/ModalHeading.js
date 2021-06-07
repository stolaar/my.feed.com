import React from 'react'
import Row from '../../containers/layout/Row'
import Column from '../../containers/layout/Column'
import CloseIcon from '../../assets/close.svg'
import classnames from 'classnames'
import LeftArrow from '../../assets/ico-back.svg'

const iconStyle = {
  float: 'right',
  cursor: 'pointer',
  width: '14px',
  height: '14px',
  objectFit: 'contain',
  position: 'absolute',
  top: '0',
  bottom: '0',
  margin: 'auto 0',
  right: '24px'
}

function ModalHeading({ onClick, title, className, goBack }) {
  return (
    <Row className="modal-heading-container">
      <Column
        className={classnames('align-items-center m-0', className)}
        style={{ marginTop: '24px' }}
        col={12}
      >
        {goBack ? (
          <div onClick={goBack} className="align-items-center modal-back-btn">
            <img
              className="text-center my-auto align-self-center"
              src={LeftArrow}
              alt="back"
            />
          </div>
        ) : null}
        <h3 style={{ display: 'inline-block' }}>{title}</h3>{' '}
        <img
          className="text-center"
          alt="close"
          src={CloseIcon}
          onClick={onClick}
          style={iconStyle}
        />
      </Column>
    </Row>
  )
}

export default ModalHeading
