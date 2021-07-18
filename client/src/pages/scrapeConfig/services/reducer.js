import {
  SET_CONFIG,
  SET_CONFIGRATIONS,
  SET_SELECTORS
} from '../../../config/actionTypes'

const initialState = {
  configuration: {
    selectors: {}
  },
  configurations: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        ...state,
        configuration: {
          ...action.payload,
          selectors: { ...state.configuration?.selectors }
        }
      }
    case SET_SELECTORS:
      return {
        ...state,
        configuration: { ...state.configuration, selectors: action.payload }
      }
    case SET_CONFIGRATIONS:
      return { ...state, configurations: action.payload }
    default:
      return state
  }
}

export default reducer
