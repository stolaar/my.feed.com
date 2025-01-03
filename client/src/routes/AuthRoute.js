import React, { useEffect, useState } from 'react'
import { Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import AuthRedirectRoute from './AuthRedirectRoute'
import { getAccessToken } from '../pages/auth/services/actions'

function AuthRoute({ redirectTo, type, component: Component, path, ...rest }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const [canPass, setCanPass] = useState(true)

  useEffect(() => {
    let isSubscribed = true
    if (localStorage.jwtToken && location.pathname === path && isSubscribed) {
      const decoded = jwt_decode(localStorage.jwtToken.split(' ')[1])
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        dispatch(getAccessToken()).catch(() => setCanPass(false))
      }
    }

    return () => {
      isSubscribed = false
    }
  }, [dispatch, location, path])

  useEffect(() => {
    return () => {
      setCanPass(false)
    }
  }, [])

  return (
    <Route
      exact
      {...rest}
      render={props =>
        canPass ? (
          <Component {...props} />
        ) : (
          <AuthRedirectRoute to={path} /> //<Redirect to={{ pathname: redirectTo ? redirectTo : home_path }} />
        )
      }
    />
  )
}

export default AuthRoute
