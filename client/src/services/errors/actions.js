import {SET_ERRORS} from "../../config/actionTypes";
import {setToastMessage} from "../../store/actions/feedbackActions";

export const setErrors = err => dispatch => {
    // TODO: handle errors
    dispatch({type: SET_ERRORS, payload: err})
    showToast(err, dispatch)
}

export const showToast = (err, dispatch) => {
    if(err?.short_message || err.response?.data?.short_message) {
        dispatch(setToastMessage({message: err?.short_message || err.response?.data?.short_message, isError: true}))
    }
}
