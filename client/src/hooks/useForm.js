import { useState } from 'react'

const useForm = (initialValues, callback) => {
  const [values, setValues] = useState(initialValues)

  const handleSubmit = event => {
    event && event.preventDefault()
    callback(event)
  }

  const handleChange = e => {
    e.persist();
    setValues(val => ({ ...val, [e.target.name]: e.target.value}))
  }

  return {
    handleSubmit,
    handleChange,
    values,
    setValues
  }
}

export default useForm
