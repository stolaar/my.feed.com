import React from 'react'
import './App.css'
import {
  landingPageRoute,
  publicRoutes,
  privateRoutes,
  guestRoutes
} from './config/routes'
import { Switch, Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux'
import useModal from './hooks/useModal'
import ToastMessage from './components/common/toast/ToastMessage'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import store from './store/store'
import { getAccessToken, setCurrentUser } from './pages/auth/services/actions'
import ProtectedRoute from './routes/ProtectedRoute'

import GuestRoute from './routes/GuestRoute'
import { makeStyles, ThemeProvider } from '@material-ui/core'
import {theme} from "./styles/theme";
import AppNavigation from "./components/navigation/AppNavigation";

if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken.split(' ')[1])
  setAuthToken(localStorage.jwtToken)
  if (decoded.exp && decoded.exp < Date.now() / 1000) {
    store.dispatch(getAccessToken())
  } else {
    store.dispatch(setCurrentUser(decoded))
  }
}

const useStyles = makeStyles({
  root: {
    display: 'flex'
  }
})

function App() {
  const {
    feedback: { toast }
  } = useSelector(state => state)
  const [activeModal] = useModal()
  const classes = useStyles()

  return (
   <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <Route
        path={'*'}
        component={AppNavigation}
      />
      {toast.show ? <ToastMessage {...toast} /> : null}
      {activeModal}

      <Switch>
        {publicRoutes.map(route => {
          return <Route exact key={route.path} path={route.path} {...route} />
        })}
        {guestRoutes.map(route => {
          return (
            <GuestRoute exact key={route.path} path={route.path} {...route} />
          )
        })}
        {privateRoutes.map(route => {
          return (
            <ProtectedRoute
              key={route.path}
              exact
              path={route.path}
              component={route.component}
            />
          )
        })}
        <Redirect to={landingPageRoute.path} />
      </Switch>
    </div>
      </ThemeProvider>
  )
}

export default App
