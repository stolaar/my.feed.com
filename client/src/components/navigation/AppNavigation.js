import React, {Fragment} from 'react'
import {drawerItems} from "./drawer/items";
import {matchPath} from "react-router";
import AppBar from "./appBar/AppBar";
import Drawer from "./drawer/Drawer";
import {useSelector} from "react-redux";
import MainAppBar from "./appBar/MainAppBar";

function AppNavigation({location: {pathname}}) {
    const {auth: {isAuthenticated}} = useSelector(state => state)

    return drawerItems
        .map(route => {
            let paths = [route.path]
            if(route.pages) paths.push(...route.pages?.map(page => page.path))
            return paths
        }).flat()
        .filter(route => matchPath(pathname, route)?.isExact).length && isAuthenticated ? (
        <Fragment>
            <AppBar />
            <Drawer />
        </Fragment>
    ) : <MainAppBar />
}

export default AppNavigation
