import React, { Fragment, useEffect, useRef } from 'react'
import Backdrop from './Backdrop'
import './Modal.css'
import classnames from 'classnames'

function Modal({ close, show, className, ...props }) {
  const modalRef = useRef()

  useEffect(() => {

    const onKeyPressed = e => e.code === 'Escape' && typeof close === 'function' ? close() : null
    
    
    document.addEventListener('keydown', onKeyPressed, false)
    return () => {
      document.removeEventListener('keydown', onKeyPressed, false)
    }
  }, [close])

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollIntoView()
    }
  }, [modalRef])

  return (
    <Fragment>
      <Backdrop show={show} onClick={close} />
      {<div
        ref={modalRef}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
          visibility: show ? 'visible' : 'hidden',
        }}
        className={classnames('custom-modal', {
          [className]: className
        })}
      >
        {props.children}
      </div>}
    </Fragment>
  )
}

export default Modal
