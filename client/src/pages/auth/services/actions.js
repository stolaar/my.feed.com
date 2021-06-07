import { setErrors } from '../../../store/actions/errorsActions'
import {
  login_endpoint,
  register_endpoint,
  register_redirect_endpoint,
  get_access_token_api,
  reset_password_api,
}
  from "../../../config/endpoints";
import {
  setActiveModal,
  setRegisterRedirectResponse,
  setResponseMessage
} from '../../../store/actions/feedbackActions.js'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../../utils/setAuthToken'
import { SET_USER } from '../../../config/actionTypes'

export const register = ({
    name,
    email,
    password,
    podcast_username
  }) => async dispatch => {
    try {
      await axios.post(register_endpoint.path, { name, email, password, podcast_username })
      dispatch(setResponseMessage('Confirmation link sent'))
    } catch (err) {
      dispatch(setErrors(err))
    }
  }

export const login = (data) => async dispatch => {
    try {
        const res = await axios.post(login_endpoint.path, {data})
        dispatch(authUserWithToken(res.data.accessToken))
    } catch (err) {
        dispatch(setErrors(err))
    }
}

export const registerRedirect = token => async dispatch => {

    try {
      const axiosInstance = axios.create()

      axiosInstance.defaults.headers['Authorization'] = token

      const {
        data: { accessToken }
      } = await axiosInstance.post(register_redirect_endpoint.path)

      if (!accessToken) {
        return dispatch(
          setRegisterRedirectResponse({ isAlreadyRegistered: true })
        )
      }
      dispatch(authUserWithToken(accessToken))
    } catch (err) {
      dispatch(setErrors(err))
    }
  }

  export const authUserWithToken = token => dispatch => {
    try {
      setAuthToken(token)
      const decoded = jwtDecode(token.split(' ')[1])
      localStorage.setItem('jwtToken', token)
      dispatch(setCurrentUser(decoded))
      dispatch(setActiveModal(''))
    } catch (err) {
      dispatch(setErrors(err))
    }
  }

  export const getAccessToken = cb => async dispatch => {
    try {
      const {
        data: { accessToken }
      } = await axios.get(get_access_token_api)
      dispatch(authUserWithToken(accessToken))
      if (cb) dispatch(cb())
    } catch (err) {
      dispatch(setErrors(err))
    }
  }

  export const setCurrentUser = payload => dispatch => {
    dispatch({ type: SET_USER, payload })
    // if(payload.id) dispatch(getPodcastForUserRequest(payload.id))
  }

  export const logoutUser = () => dispatch => {
    setAuthToken('')
    dispatch(setCurrentUser({}))
    localStorage.removeItem('jwtToken')
  }

  export const passwordResetRequest = email => async dispatch => {
    try {
      await axios.post(reset_password_api.path, { email })
      dispatch(setResponseMessage('Password reset message sent'))
    } catch (err) {
      dispatch(setErrors(err))
    }
  }
