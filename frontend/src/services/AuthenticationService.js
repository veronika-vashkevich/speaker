import axios from 'axios'
import {API_URL} from '../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {


    executeBasicAuthenticationService(email, password) {
        console.log("executeBasicAuthenticationService");
        return axios.get(`${API_URL}/auth`,
            {headers: {authorization: this.createBasicAuthToken(email, password)}}
            )
    }

    executeJwtAuthenticationService(email, password) {
        return axios.post(`${API_URL}/auth/login`,
            {
                email,
                password
            },
            {headers: {authorization: this.createBasicAuthToken(email, password)}}
        )
    }

    createBasicAuthToken(email, password) {
        return 'Basic ' + window.btoa(email + ":" + password)
    }

    registerSuccessfulLogin(email, password) {
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
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
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


    getUserAuthority(email) {
        console.log("getUserAuthority ");
        return axios.get(`${API_URL}/auth/authority`, {
            params: {
                email: email
            }
        })
    }


    setupAxiosInterceptors(token) {
        console.log("setupAxiosInterceptors()...");
        console.log("token from storage ", sessionStorage.getItem('token'));
        console.log("token from  input variables", token);
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
