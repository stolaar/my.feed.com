import React, { useEffect } from 'react'
import './ToastMessage.css'
import { setToastMessage } from '../../../store/actions/feedbackActions'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'

function ToastMessage({ message, isError }) {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setToastMessage(''))
    }, 3000)
  }, [dispatch])
  return (
    <div
      className={classnames('toast-message-wrapper', {
        'toast-error': isError
      })}
    >
      {message}
    </div>
  )
}

export default ToastMessage
