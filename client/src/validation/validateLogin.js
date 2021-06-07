import isEmpty from 'lodash.isempty'
import Validator from 'validator'

function validateLogin({email, password}) {
  const errors = {}

  if (!Validator.isEmail(email)) errors.email = 'Invalid email address'
  if (isEmpty(email)) errors.email = 'Email cannot be empty'
  if (password.length < 6) errors.password = 'Password minimum length must be at least 6 characters'

  return { errors, isValid: isEmpty(errors) }

}

export default validateLogin
