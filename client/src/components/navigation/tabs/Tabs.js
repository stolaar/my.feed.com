import React from 'react'
import MaterialTabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useDispatch, useSelector} from "react-redux";
import {setActiveTab} from "../../../services/navigation/actions";
import {useHistory} from "react-router";

function Tabs() {
    const {tabs, activeTab: {value, pathname}} = useSelector(state => state.navigation)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (e, value) => {
        if(!value) return
        dispatch(setActiveTab(value))
        history.push(`${pathname}/${value}`)
    }

    return  <MaterialTabs value={value} onChange={handleChange}>
            {tabs.map(({label}, key) => {
                return <Tab value={label} key={key} label={label} />
            })}
        </MaterialTabs>
}

export default Tabs
