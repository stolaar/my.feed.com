import {
  SET_CONFIG,
  SET_CONFIGRATIONS,
  SET_SELECTORS,
  SET_IS_SCRAPPING
} from '../../../config/actionTypes'

export const initialConfiguration = {
  uri: '',
  label: '',
  selectors: {
    wrapper: '',
    article: '',
    title: '',
    description: '',
    image: '',
    link: ''
  }
}

const initialState = {
  configuration: initialConfiguration,
  configurations: [],
  isScrapping: false
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
    case SET_IS_SCRAPPING:
      return {...state, isScrapping: action.payload}
    default:
      return state
  }
}

export default reducer
