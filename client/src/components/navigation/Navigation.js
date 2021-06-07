import React from 'react'
import classes from './Navigation.module.css'
import NavItem from './NavItem/NavItem'
import { NavLink, useHistory } from 'react-router-dom'
import Button from './../common/Button'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../pages/auth/services/actions'
import { setSideBar } from '../../store/actions/feedbackActions'
import { Navbar, Nav } from 'react-bootstrap'

import {
  landingPageRoute,
  loginPageRoute,
  //signUpPageRoute,
  homePageRoute, }
  from '../../config/routes'
import { Fragment } from 'react'

function Navigation (props) {

  const {feedback:{showSideBar}} = useSelector(state => state);

  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = () => {
    dispatch(logoutUser())
    if (window.FB) window.FB.logout()
    history.push(landingPageRoute.path)
  }

  const onClickCogIcon = () => dispatch(setSideBar(!showSideBar))

  return(
    <div className='container-1615 mt-33'>
      <header>
        <Navbar expand="lg">
          <Navbar.Brand href="home">
            {/*<img src={Logo} className={classes.Logo} alt='logo' />*/}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className={classes.Nav}>
                <div className={classes.FirstSection}>
                  {!props.isAuthenticated ?
                    <ul className={classes.NavLinkItems}>
                      <NavItem name = {landingPageRoute.name} path={landingPageRoute.path}/>
                    </ul>
                    :
                    <ul className={classes.NavLinkItems}>
                      <NavItem name = {homePageRoute.name} path={homePageRoute.path}/>
                    </ul>
                  }
                </div>
                <div className={classes.SecondSection}>
                  {!props.isAuthenticated ?
                    <ul className={classes.NavLinkItems}>
                      <NavLink className={classes.ButtonLogin} to={loginPageRoute.path}>{loginPageRoute.name}</NavLink>
                      {/*<NavLink className={classes.ButtonSignUp} to={signUpPageRoute.path}>{signUpPageRoute.name}</NavLink>*/}
                    </ul>
                    :
                    //TODO search bar
                    <Fragment>
                      <span className={classes.cogIcon} onClick={onClickCogIcon}><i className="fas fa-cog"></i></span>
                      <Button className={classes.ButtonSignUp} type="submit" text="Logout" onClick={onLogout}/>
                    </Fragment>
                  }
                </div>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </div>
  )
}

export default Navigation;
