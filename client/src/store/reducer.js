import errors from './reducers/errorsReducer'
import auth from '../pages/auth/services/reducers'
import feedback from './reducers/feedbackReducers'
import passwordReset from '../pages/auth/resetPassword/services/reducers'
import navigation from '../services/navigation/reducer'
import feed from '../pages/home/services/reducer'
import scrapeConfig from '../pages/scrapeConfig/services/reducer'
import {combineReducers} from "redux";

export default combineReducers({
    errors,
    auth,
    passwordReset,
    feedback,
    navigation,
    feed,
    scrapeConfig
})
