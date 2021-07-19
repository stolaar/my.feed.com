import {
  SET_CONFIG,
  SET_SELECTORS,
  SET_CONFIGRATIONS,
  SET_IS_SCRAPPING
} from '../../../config/actionTypes'
import { setErrors } from '../../../services/errors/actions'
import axios from 'axios'
import {
  create_config_api, delete_configuration_api,
  get_configurations_api, scrape_from_configuration_api, update_config_api
} from '../../../config/endpoints'
import {setToastMessage} from "../../../store/actions/feedbackActions";

export const setConfig = payload => ({ type: SET_CONFIG, payload })
export const setSelectors = payload => ({ type: SET_SELECTORS, payload })

export const createConfig = payload => async dispatch => {
  try {
    await axios.post(create_config_api.path, payload)
    dispatch(setToastMessage({message: 'Configuration created!'}))
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

export const deleteConfiguration = (id) => async dispatch => {
  try {
    await axios.delete(delete_configuration_api.path.concat('?id=' + id))
    dispatch(getConfigurations())
  } catch (err) {
    dispatch(setErrors(err))
  }
}

export const scrapeFromConfiguration = (id) => async dispatch => {
  try {
    dispatch(setIsScrapping(true))
    await axios.post(scrape_from_configuration_api.path, {configuration_id: id})
    dispatch(setToastMessage({message: 'Scrapped successfully!'}))

    dispatch(getConfigurations())
    dispatch(setIsScrapping(false))
  } catch (err) {
    dispatch(setIsScrapping(false))
    dispatch(setErrors(err))
  }
}

export const updateConfig = (payload, cb) => async dispatch => {
  try {
    await axios.patch(update_config_api.path, payload)
    dispatch(setToastMessage({message: 'Configuration updated!'}))
    cb && cb()
    dispatch(getConfigurations())
  } catch (err) {
    dispatch(setErrors(err))
  }
}

export const setIsScrapping = payload => ({
  type: SET_IS_SCRAPPING,
  payload
})
