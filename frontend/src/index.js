import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';

import { Router , BrowserRouter } from "react-router-dom"
import {createBrowserHistory} from 'history'

import './index.scss'
import App from './App'
import LandingPage from './components/Landing/LandingPage'
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common.Accept = 'application/json';


// создаём кастомную историю
const history = createBrowserHistory()

ReactDOM.render(
    (<BrowserRouter>
            <App />
    </BrowserRouter>
      
        /*<Router history={history}>*/
        /*    <App/>*/
        /*</Router>*/
     )
    , document.getElementById('root')
);

// serviceWorker.unregister();