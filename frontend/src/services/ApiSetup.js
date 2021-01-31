//
// import axios from 'axios'
// import { API_URL } from '../Constants'
// import AuthenticationService from "../services/AuthenticationService";
//
// const request = axios.create({
//     baseURL: `${API_URL}`
// });
//
// request.interceptors.request.use(config => {
//     if (AuthenticationService.isUserLoggedIn()) {
//         config.headers.authorization = token
//     }
// }, err => {
//     console.log(err);
//     return Promise.reject(err)
// });
//
// export default request
