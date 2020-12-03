import React, { Component } from 'react';

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"

import './App.scss';

import Home from './components/Home/Home'
import Lessons from './components/Lessons/Lessons'

class App extends Component {
    render() {
        const { history } = this.props

        return (
            <div className="App">
                <Switch>
                    <Route history={history} path='/home' component={Home} />
                    <Route history={history} path='/lessons' component={Lessons} />
                    <Redirect from='/' to='/home'/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App)