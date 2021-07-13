import React from 'react'
import clsx from 'clsx'
import {makeStyles} from "@material-ui/core";
import {useSelector} from "react-redux";
import {drawerWidth} from "../../constants/style";


const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}))

function MainContainer(props) {
    const classes = useStyles()
    const {isDrawerOpen: open} = useSelector(state => state.navigation)

    return <main className={clsx(classes.content, {
        [classes.contentShift]: open,
    })}>
        <div className={classes.drawerHeader} />
        {props.children}
    </main>
}

export default MainContainer
