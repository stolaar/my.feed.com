import React from 'react'
import CustomButton from '../../common/CustomButton'
import './Login.css'

function LoginButton({ onClick, text = 'Next', style }) {
  return (
    <CustomButton
      style={style}
      onClick={onClick}
      wrapperClassName="login-btn"
      textClassName="login-btn-text"
      text={text}
    />
  )
}

export default LoginButton
