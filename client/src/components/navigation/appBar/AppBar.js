import React, {Fragment} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch, useSelector} from "react-redux";
import {handleDrawer} from "../../../services/navigation/actions";
import {makeStyles} from "@material-ui/core";
import {drawerItems} from "../drawer/items";
import {matchPath, useLocation} from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        textAlign: "center"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        textAlign: 'center'
    },
    hide: {
        display: 'none',
    },
    title: {
        textAlign: 'center',
        margin: "auto"
    }
}));

function AppBar() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {isDrawerOpen: open} = useSelector(state => state.navigation)
    const {pathname} = useLocation()

    const handleDrawerOpen = (val) => {
        dispatch(handleDrawer(val))
    }

    const title = findActivePageTitle(drawerItems, pathname)

    return <Fragment>
        <CssBaseline />
    <MaterialAppBar
        position="fixed"
        color={'default'}
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
    >
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
                {title}
            </Typography>
        </Toolbar>
    </MaterialAppBar>
    </Fragment>
}

export default AppBar


function findActivePageTitle(pages, pathname) {
    return pages.reduce((acc, curr) => {
        acc = [...acc, {path: curr.path, name: curr.name}]
        if(curr.pages) {
            acc = [...acc,...curr.pages.map(({path, name}) => ({path, name}))]
        }
        return acc
    }, []).find(val => matchPath(val.path, pathname)?.isExact)?.name
}
