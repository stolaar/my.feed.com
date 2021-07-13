const httpMethods = {
    post: 'POST',
    get: 'GET',
    patch: 'PATCH',
    delete: 'DELETE'
}

export const login_endpoint = { path: "/api/auth/login", method: httpMethods.post }
export const register_endpoint = { path: "/api/auth/register", method: httpMethods.post }
export const register_redirect_endpoint = { path: "/api/auth/register/redirect", method: httpMethods.post }
export const get_access_token_api = { path: "/api/auth/get-access-token", method: httpMethods.get }
export const reset_password_api = { path: "/api/auth/password-reset", method: httpMethods.post }
export const reset_password_redirect_api = { path: "/api/auth/password-reset/redirect", method: httpMethods.post }
export const get_posts_api = { path: "/api/feed", method: httpMethods.get }

