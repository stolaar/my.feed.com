import {SET_ACTIVE_TAB, SET_DRAWER, SET_TABS} from "../../config/actionTypes";

export const handleDrawer = payload => ({type: SET_DRAWER, payload})

export const setTabs = payload => dispatch => {
    dispatch(setActiveTab(payload[0]?.slug))
    dispatch(({type: SET_TABS, payload}))
}

export const setActiveTab = payload => ({type: SET_ACTIVE_TAB, payload})
