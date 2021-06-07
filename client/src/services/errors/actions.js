import {SET_ERRORS} from "../../config/actionTypes";

export const setErrors = err => dispatch => {
    // TODO: handle errors
    dispatch({type: SET_ERRORS, payload: err})
}
