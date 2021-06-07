import {
    SET_RESPONSE_MESSAGE,
    SET_REGISTER_REDIRECT_RESPONSE,
    SET_MODAL,
    SET_TOAST_MESSAGE,
    SET_LOADING_SPINNER,
    SET_SIDEBAR,
    SET_UPLOAD_PERCENTAGE
  } from '../../config/actionTypes'
  import isEmpty from 'lodash.isempty'

  const initialState = {
    showSpinner: false,
    activeModal: '',
    pageRoute: '',
    toast: { show: false, message: '' },
    toastLinks: { showLinks: false, message: '' },
    showSideBar: false,
    uploadPercentage: false
  }

  const feedbackReducers = (state = initialState, action) => {
    switch (action.type) {
      case SET_RESPONSE_MESSAGE:
        return {
          ...state,
          responseMessage: action.payload
        }
      case SET_REGISTER_REDIRECT_RESPONSE:
        return { ...state, ...action.payload }
      case SET_MODAL:
        return {
          ...state,
          activeModal: action.payload
        }
      case SET_TOAST_MESSAGE:
        return {
          ...state,
          toast: { show: !isEmpty(action.payload), ...action.payload }
        }
      case SET_LOADING_SPINNER:
        return {
          ...state,
          showSpinner: action.payload
        }
      case SET_SIDEBAR:
        return {
          ...state,
          showSideBar: action.payload
        }
      case SET_UPLOAD_PERCENTAGE:
        return {
          ...state,
          uploadPercentage: action.payload
        }
      default:
        return { ...state, responseMessage: null }
    }
  }

  export default feedbackReducers
