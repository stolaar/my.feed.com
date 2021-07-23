import {SET_ACTIVE_TAB, SET_DRAWER, SET_TABS} from '../../config/actionTypes'

const initialState = {
    isDrawerOpen: true,
    tabs: [],
    activeTab: {
        value: '',
        pathname: '/category'
    },
    search: {
        pathname: '/search'
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRAWER:
            return {...state, isDrawerOpen: !state.isDrawerOpen}
        case SET_TABS:
            return {...state, tabs: action.payload}
        case SET_ACTIVE_TAB:
            return {...state, activeTab: {...state.activeTab, value: action.payload}}
        default:
            return state
    }
}


export default reducer
