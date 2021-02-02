import axios from 'axios'
import { API_URL } from '../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {


    executeBasicAuthenticationService(email, password) {
        console.log("executeBasicAuthenticationService");
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
        console.log("createBasicAuthToken");
        return 'Basic ' + window.btoa(email + ":" + password)
    }

    registerSuccessfulLogin(email, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(email + ":" + password)
        //console.log('registerSuccessfulLogin')
        console.log("registerSuccessfulLogin");
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, email)
        this.setupAxiosInterceptors(this.createBasicAuthToken(email, password))
    }

    registerSuccessfulLoginForJwt(email, token) {
        console.log("registerSuccessfulLoginForJwt");
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, email);
        sessionStorage.setItem('token', token);
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        console.log("createJWTToken");
        console.log("token from createJWTToken() function", token);
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
        // console.log("getLoggedInUserName()")
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return '';
        // console.log("user " + user)
        return user
    }



    setupAxiosInterceptors(token) {
        console.log("setupAxiosInterceptors()...");
        console.log("token from storage ", sessionStorage.getItem('token' ));
        console.log("token from  input variables", token );
        axios.interceptors.request.use(
            (config) => {

                if (this.isUserLoggedIn()) {
                    config.headers.Authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()
