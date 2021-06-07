import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../common/InputField'
import Button from '../common/Button'
import useForm from '../../hooks/useForm'
import AuthCss from './Auth.module.css'
import CommonCss from '../common/Common.module.css'
import validateRegister from '../../validation/register'
import {
    loginPageRoute
} from '../../config/routes'
import { Link } from 'react-router-dom'

import { register } from '../../pages/auth/services/actions'


const SignUpForm = () => {
    const dispatch = useDispatch()
    const {errors,} = useSelector(state => state)
    const [formErrors, setFormErrors] = useState({})

    const onSubmit = () => {
        const { errors, isValid } = validateRegister(values)
        if (!isValid) {
          setFormErrors(errors)
          return null
        } else setFormErrors({})
        dispatch(register({ ...values}))
    }

    const { values, handleChange, handleSubmit } = useForm(
        { name: '', email: '', password: '' },
        onSubmit
    )

    return (
        <form onSubmit={handleSubmit} className={AuthCss.formAuth}>
            <h1 className={CommonCss.titleForm}>Sign up</h1>
            <InputField
                labelClassName={CommonCss.formLabel}
                inputClassName={CommonCss.inputOne}
                labelValue="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={formErrors.name || errors.name}
            />
            <InputField
                labelClassName={CommonCss.formLabel}
                inputClassName={CommonCss.inputOne}
                labelValue="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                type="email"
                error={formErrors.email || errors.email}
            />
            <InputField
                labelClassName={CommonCss.formLabel}
                inputClassName={CommonCss.inputOne}
                labelValue="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={formErrors.password || errors.password}
            />
            <p className={AuthCss.bottomSign}>
                Already Have An Account ? <span><Link to={loginPageRoute.path}>Login</Link></span>
            </p>
            <Button
                className={CommonCss.submitBtn}
                onSubmit={handleSubmit}
                type="submit"
                text="Sign up"
            />
            <div className={AuthCss.bottomFormText}>
                <p >
                    By signing up you agree to our
                    <br/>
                    <span>Terms & Condition</span>
                </p>
            </div>
        </form>
    )
}

export default SignUpForm
