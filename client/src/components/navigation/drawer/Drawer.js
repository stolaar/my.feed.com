import React, { Fragment } from 'react'
import MaterialDrawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import useTheme from '@material-ui/core/styles/useTheme'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import { handleDrawer } from '../../../services/navigation/actions'
import { drawerItems } from './items'
import { ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router'
import { logoutUser } from '../../../pages/auth/services/actions'

function Drawer() {
  const classes = useStyles()
  const { isDrawerOpen: open } = useSelector(state => state.navigation)
  const theme = useTheme()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDrawerClose = val => {
    dispatch(handleDrawer(val))
  }

  const onNavItemClick = path => {
    history.push(path)
  }

  const onLogout = () => {
    dispatch(logoutUser())
  }

  const drawer = (
    <Fragment>
      <div className={classes.toolbar} />
      <div className={classes.drawerHeader}>
          <span id={'brand'}>
              LOGO
          </span>

        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <Divider />
      <List>
        {drawerItems.map(({ name: text, icon, path }, index) => (
          <ListItem onClick={() => onNavItemClick(path)} button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem onClick={onLogout} button>
          <ListItemIcon>{<ExitToApp />}</ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </Fragment>
  )

  return (
    <Fragment>
      <MaterialDrawer
        className={classes.drawer}
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {drawer}
      </MaterialDrawer>
    </Fragment>
  )
}

export default Drawer
