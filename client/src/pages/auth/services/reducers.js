import isEmpty from 'lodash.isempty'
import { SET_USER } from '../../../config/actionTypes'

const initialState = {
  isAuthenticated: false,
  user: {}
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state
  }
}

export default reducers
