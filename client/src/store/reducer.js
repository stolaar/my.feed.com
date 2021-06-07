import errors from './reducers/errorsReducer'
import auth from '../pages/auth/services/reducers'
import feedback from './reducers/feedbackReducers'
import passwordReset from '../pages/auth/resetPassword/services/reducers'
import {combineReducers} from "redux";

export default combineReducers({
    errors,
    auth,
    passwordReset,
    feedback
})
