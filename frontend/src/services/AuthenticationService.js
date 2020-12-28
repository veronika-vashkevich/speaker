import axios from 'axios'
import { API_URL } from '../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(email, password) {
        return axios.get(`${API_URL}/auth`,
            // return axios.get(`/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(email, password) } })
    }
    
    executeJwtAuthenticationService(email, password) {
        return axios.post(`${API_URL}/auth/login`, {
        // return axios.post(`${API_URL}/login`, {
            email,
            password
        })
    }

    createBasicAuthToken(email, password) {
        return 'Basic ' + window.btoa(email + ":" + password)
    }

    registerSuccessfulLogin(email, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(email + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, email)
        this.setupAxiosInterceptors(this.createBasicAuthToken(email, password))
    }

    registerSuccessfulLoginForJwt(email, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, email)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        console.log("logout clicked")
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        console.log("USER_NAME_SESSION_ATTRIBUTE_NAME is",sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) )
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return '';
        return user
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()