import {
  SET_MODAL,
  SET_RESPONSE_MESSAGE,
  SET_REGISTER_REDIRECT_RESPONSE,
  SET_PAGE_ROUTE_PATH,
  SET_TOAST_MESSAGE,
  SET_LOADING_SPINNER,
  SET_SIDEBAR,
} from '../../config/actionTypes'

export const setSideBar = payload => dispatch => {
  dispatch({ type: SET_SIDEBAR, payload })
}

export const setResponseMessage = payload => dispatch => {
  dispatch({ type: SET_RESPONSE_MESSAGE, payload })
}

export const setRegisterRedirectResponse = payload => dispatch => {
  dispatch({ type: SET_REGISTER_REDIRECT_RESPONSE, payload })
}

export const setActiveModal = modal => dispatch => {
  dispatch({ type: SET_MODAL, payload: modal })
}

export const setPageRoutePath = route_path => dispatch => {
  dispatch({ type: SET_PAGE_ROUTE_PATH, payload: route_path })
}
export const setToastMessage = payload => dispatch => {
  dispatch({ type: SET_TOAST_MESSAGE, payload })
}


export const setLoading = payload => ({type: SET_LOADING_SPINNER, payload})
