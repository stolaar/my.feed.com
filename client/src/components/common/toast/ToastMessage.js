import React, { useEffect } from 'react'
import './ToastMessage.css'
import { setToastMessage } from '../../../store/actions/feedbackActions'
import { useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

function ToastMessage({ message, isError }) {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setToastMessage(''))
    }, 3000)
  }, [dispatch])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={true}
    >
        <Alert severity={isError ? 'error' : 'success'}>{message}</Alert>
    </Snackbar>
  )
}

export default ToastMessage
