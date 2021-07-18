import LoginPage from '../pages/auth/LoginPage'
import RegisterConfirmation from '../components/auth/RegisterConfirmation'

import PasswordReset from '../pages/auth/resetPassword/PasswordReset'
import HomePage from '../pages/home/HomePage'
import ScrapeConfigPage from '../pages/scrapeConfig/ScrapeConfigPage'
import CreateScrapeConfigPage from "../pages/scrapeConfig/CreateScrapeConfigPage";

export const landingPageRoute = {
  path: '/',
  exact: true,
  name: 'Home',
  component: HomePage
}
export const scrapeConfigPage = {
  path: '/config',
  exact: true,
  name: 'Settings',
  component: ScrapeConfigPage
}

export const createScrapeConfigPage = {
  path: '/config/create',
  exact: true,
  name: 'Create config',
  component: CreateScrapeConfigPage
}

// UNCOMMENT IF YOU WANT TO HAVE SIGNUP
// export const signUpPageRoute = { path: "/signup",exact: true, name: "Sign up", component: SignUpPage }
export const loginPageRoute = {
  path: '/login',
  exact: true,
  name: 'Login',
  component: LoginPage
}
export const registerConfrimationRoute = {
  path: '/register/:confirmationToken',
  exact: true,
  component: RegisterConfirmation
}
export const passwordResetRoute = {
  path: '/password-reset/:token',
  exact: true,
  component: PasswordReset
}

export const publicRoutes = []

export const privateRoutes = [landingPageRoute, scrapeConfigPage, createScrapeConfigPage]
export const guestRoutes = [
  loginPageRoute,
  passwordResetRoute,
  registerConfrimationRoute
]
