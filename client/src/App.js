import React from 'react'
import './App.css'
import {landingPageRoute, publicRoutes, privateRoutes, guestRoutes} from "./config/routes"
import {Switch, Redirect, Route} from "react-router"
import { useSelector } from 'react-redux'
import Navigation from './components/navigation/Navigation'
import SideBar from './components/SideBar/SideBar'
import useModal from './hooks/useModal'
import ToastMessage from './components/common/toast/ToastMessage'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import store from './store/store'
import { getAccessToken, setCurrentUser } from './pages/auth/services/actions'
import ProtectedRoute from './routes/ProtectedRoute'

import LoaderPercentage from './components/common/loader_percentage/LoaderPercentage'
import GuestRoute from "./routes/GuestRoute";

if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken.split(' ')[1])
    setAuthToken(localStorage.jwtToken)
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      store.dispatch(getAccessToken())
    } else {
      store.dispatch(setCurrentUser(decoded))
    }
  }

function App() {
    const {
        auth: { isAuthenticated },
        feedback: { toast, uploadPercentage},
      } = useSelector(state => state)
    const [activeModal] = useModal()

    return (
        <div className="App">
            <SideBar />
            <Navigation isAuthenticated={isAuthenticated} />
            {toast.show ? <ToastMessage {...toast} /> : null}
            {activeModal}
            {uploadPercentage ? <LoaderPercentage percentage={uploadPercentage.toFixed()}/> : null}
            <Switch>
                {publicRoutes.map(route => {
                    return <Route exact key={route.path} path={route.path} {...route} />
                })}
                {guestRoutes.map(route => {
                    return <GuestRoute exact key={route.path} path={route.path} {...route} />
                })}
                {privateRoutes.map(route => {
                    return <ProtectedRoute
                      key={route.path}
                      exact
                      path={route.path}
                      component={route.component} />
                })}
                <Redirect to={landingPageRoute.path}/>
            </Switch>
        </div>
    );
}

export default App;
