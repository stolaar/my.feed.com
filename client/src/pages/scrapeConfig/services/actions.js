import {
  SET_CONFIG,
  SET_SELECTORS,
  SET_CONFIGRATIONS
} from '../../../config/actionTypes'
import { setErrors } from '../../../services/errors/actions'
import axios from 'axios'
import {
  create_config_api,
  get_configurations_api
} from '../../../config/endpoints'

export const setConfig = payload => ({ type: SET_CONFIG, payload })
export const setSelectors = payload => ({ type: SET_SELECTORS, payload })

export const createConfig = payload => async dispatch => {
  try {
    await axios.post(create_config_api.path, payload)
  } catch (err) {
    dispatch(setErrors(err))
  }
}

export const getConfigurations = () => async dispatch => {
  try {
    const {data} = await axios.get(get_configurations_api.path)
    dispatch(setConfigurations(data))
  } catch (err) {
    dispatch(setErrors(err))
  }
}

export const setConfigurations = payload => ({
  type: SET_CONFIGRATIONS,
  payload
})
