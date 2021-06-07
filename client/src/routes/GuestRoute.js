import React, { useEffect } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { landingPageRoute } from '../config/routes'
import { getAccessToken } from '../pages/auth/services/actions'

function GuestRoute({
  redirectTo,
  type,
  component: Component,
  replacementComponent: ReplacementComponent,
  path,
  ...rest
}) {
  const dispatch = useDispatch()
  const location = useLocation()
  const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (localStorage.jwtToken && location.pathname === path) {
      const decoded = jwt_decode(localStorage.jwtToken.split(' ')[1])
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        dispatch(getAccessToken())
      }
    }
  }, [dispatch, location, path])

  return (
    <Route
      exact
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : ReplacementComponent ? (
          <ReplacementComponent />
        ) : (
          <Redirect to={{ pathname: redirectTo ? redirectTo : landingPageRoute.path }} />
        )
      }
    />
  )
}

export default GuestRoute
