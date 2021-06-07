import Validator from 'validator'
import isEmpty from 'lodash.isempty'

function validateRegister({ name, email, password }) {
  const errors = {}

  if (!Validator.isEmail(email)) errors.email = 'Invalid email address'
  if (isEmpty(name)) errors.name = 'Name cannot be empty'
  if (password.length < 6) errors.password = 'Password minimum length must be at least 6 characters'

  return { errors, isValid: isEmpty(errors) }
}

export default validateRegister
