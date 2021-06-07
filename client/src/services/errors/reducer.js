import { SET_ERRORS } from '../../config/actionTypes'

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return action.payload
        default:
            return {}
    }
}


export default reducer
