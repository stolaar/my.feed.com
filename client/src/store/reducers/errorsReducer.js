import { SET_ERRORS } from '../../config/actionTypes'

const errorsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload
    default:
      return {}
  }
}

export default errorsReducer
