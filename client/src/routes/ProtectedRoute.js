import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router'
import Loader from '../components/common/loader/Loader'
import { setLoading } from '../store/actions/feedbackActions'
import jwt_decode from 'jwt-decode'


function ProtectedRoute({ path, component: Component, ...rest }) {
  const {
    feedback: { showSpinner },
    auth: {isAuthenticated}
  } = useSelector(state => state)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.jwtToken && location.pathname === path) {
      const decoded = jwt_decode(localStorage.jwtToken.split(' ')[1])
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        // dispatch(getAccessToken())
      }
      dispatch(setLoading(false))
    }
  }, [dispatch, location, path])

  useEffect(() => {
    // dispatch(getUserPermissions())
  }, [dispatch])
  return <Route path={path}
                render={() => showSpinner ? <Loader show={true}/>
                : isAuthenticated ? <Component {...rest} /> : <Redirect to={{ pathname: '/login' }}/>} />
}


export default ProtectedRoute
