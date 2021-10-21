import React from 'react'
import MaterialTabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useDispatch, useSelector} from "react-redux";
import {setActiveTab} from "../../../services/navigation/actions";
import {useHistory} from "react-router";
import {makeStyles} from "@material-ui/core/styles";

function Tabs() {
    const {tabs, activeTab: {value, pathname}} = useSelector(state => state.navigation)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    const handleChange = (e, value) => {
        if(!value) return
        dispatch(setActiveTab(value))
        history.push(`${pathname}/${value}`)
    }

    return  <MaterialTabs variant="scrollable"
                          classes={{indicator: classes.indicator}}
                          scrollButtons="off" value={value} onChange={handleChange}>
            {tabs.map(({label, slug}, key) => {
                return <Tab value={slug} key={key} label={label} />
            })}
        </MaterialTabs>
}

export default Tabs


const useStyles = makeStyles(theme => ({
    indicator: {
        backgroundColor: theme.palette.common.white
    }
}))
