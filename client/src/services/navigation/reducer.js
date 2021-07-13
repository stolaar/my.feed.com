import { SET_DRAWER } from '../../config/actionTypes'

const initialState = {
    isDrawerOpen: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRAWER:
            return {...state, isDrawerOpen: !state.isDrawerOpen}
        default:
            return state
    }
}


export default reducer
