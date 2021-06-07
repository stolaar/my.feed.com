import LoginPage from "../pages/auth/LoginPage"
import RegisterConfirmation from "../components/auth/RegisterConfirmation"
// import SignUpPage from "../pages/auth/SignUpPage/SignUpPage";
import PasswordReset from "../pages/auth/resetPassword/PasswordReset"
import HomePage from "../pages/home/HomePage";

export const landingPageRoute = { path: "/",exact: true, name: "Home", component: HomePage }
export const homePageRoute = { path: "/home",exact: true, name: "Home", component: HomePage }
export const loginPageRoute = { path: "/login",exact: true, name: "Login", component: LoginPage }
// UNCOMMENT IF YOU WANT TO HAVE SIGNUP
// export const signUpPageRoute = { path: "/signup",exact: true, name: "Sign up", component: SignUpPage }

export const registerConfrimationRoute = { path: "/register/:confirmationToken", exact: true, component: RegisterConfirmation }
export const passwordResetRoute = { path: "/password-reset/:token", exact: true, component: PasswordReset }

export const publicRoutes = [];

export const privateRoutes = [homePageRoute,landingPageRoute]
export const guestRoutes = [loginPageRoute,passwordResetRoute, registerConfrimationRoute]
