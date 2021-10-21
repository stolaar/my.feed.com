import React, { Fragment, useState } from 'react'
import { AppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { alpha, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import CssBaseline from '@material-ui/core/CssBaseline'
import Tabs from '../tabs/Tabs'
import Divider from '@material-ui/core/Divider'
import { matchPath, useHistory, useLocation } from 'react-router'
import {categoryPageRoute, homePageRoute, landingPageRoute} from '../../../config/routes'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    '& a': {
      color: '#fff',
      '&:hover': {
        textDecoration: 'none'
      }
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

function MainAppBar() {
  const classes = useStyles()
  const { pathname } = useLocation()
  const [search, setSearch] = useState('')
  const { pathname: searchPathname } = useSelector(
    state => state.navigation.search
  )
  const history = useHistory()

  const onSearchChange = e => {
    setSearch(e.target.value)
  }

  const onSearchSubmit = e => {
    e.preventDefault()
    history.push(searchPathname + '?search=' + search)
  }

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="fixed" color={'default'}>
        <Toolbar>

            <Typography className={classes.title} variant="h6" noWrap>
              <Link to={landingPageRoute.path}>FEED</Link>
            </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={onSearchSubmit}>
              <InputBase
                onChange={onSearchChange}
                value={search}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </form>
          </div>
        </Toolbar>
        {displayTabs(pathname)}
      </AppBar>
    </Fragment>
  )
}

export default MainAppBar

function displayTabs(pathname) {
  return matchPath(pathname, categoryPageRoute.path)?.isExact
  || matchPath(pathname, landingPageRoute.path)?.isExact || matchPath(pathname, homePageRoute.path)?.isExact ? (
    <Fragment>
      <Divider />
      <Tabs />
    </Fragment>
  ) : null
}
