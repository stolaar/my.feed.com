import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../common/InputField'
import Button from '../common/Button'
import validateLogin from '../../validation/validateLogin'
import useForm from '../../hooks/useForm'
import { login } from '../../pages/auth/services/actions'
import AuthCss from './Auth.module.css'
import CommonCss from '../common/Common.module.css'
import { setActiveModal } from '../../store/actions/feedbackActions'
import {
    password_reset_request_modal
  } from '../../config/modal_path'

const LoginForm = () => {
    const dispatch = useDispatch()
    const {errors} = useSelector(state => state)
    const [formErrors, setFormErrors] = useState({})

    const onSubmit = () => {
        const { errors, isValid } = validateLogin(values)
        if (!isValid) {
          setFormErrors(errors)
          return null
        } else setFormErrors({})
        dispatch(login({ ...values}))
    }

    const { values, handleChange, handleSubmit } = useForm(
        { email: '', password: '' },
        onSubmit
    )

      const onPasswordResetClickHandler = () => {
        dispatch(setActiveModal(password_reset_request_modal))
      }

    return (
        <form className={AuthCss.formAuth} onSubmit={handleSubmit}>
            <h1 className={CommonCss.titleForm}>Login</h1>
            <InputField
                labelClassName={CommonCss.formLabel}
                inputClassName={CommonCss.inputOne}
                labelValue="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={formErrors.email || errors.email}
            />
            <InputField
                labelClassName={CommonCss.formLabel}
                inputClassName={CommonCss.inputOne}
                labelValue="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                type="password"
                error={formErrors.password || errors.password}
            />
            <span className={AuthCss.resetPassword} onClick={onPasswordResetClickHandler}>Forgot password ?</span>
            <Button
                className={CommonCss.submitBtn}
                type="submit"
                text="Login"
            />
            <div className={`dropdown-divider ${AuthCss.divider}`}/>
        </form>
    )
}

export default LoginForm
