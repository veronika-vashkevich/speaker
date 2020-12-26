import React, { Component } from 'react';

import {
    Route,
    Switch,
    Redirect,
    BrowserRouter,
    withRouter
} from "react-router-dom"
import {ProtectedRoute} from "./components/Routes/ProtectedRoute";

import './App.scss';

import Home from './components/Home/Home'
import Lessons from './components/Lessons/Lessons'
import LandingPage from "./components/Landing/LandingPage";
import AppLayout from "./components/Layout/AppLayout"
import LoginPage from "./components/Page/LoginPage";
import CoursesPage from "./components/Course/CoursesPage";
import BeginnerCoursePage from "./components/Page/BiginnerCoursePage"
import ContinueCoursePage from "./components/Page/ContinueCoursePage";
import AdvancedCoursePage from "./components/Page/AdvancedCoursePage";


class App extends Component {
    
    render() {
        // const { history } = this.props

        return (
            
            <div className="App">
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/app" component={AppLayout} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/home" component={LandingPage} />
                    <Route exact path="/my-lessons" component={Lessons} />
                    <Route exact path="/courses" component={CoursesPage} />
                    <Route exact path="/courses/beginner" component={BeginnerCoursePage} />
                    <Route exact path="/courses/continue" component={ContinueCoursePage} />
                    <Route exact path="/courses/advanced" component={AdvancedCoursePage} />
                    <ProtectedRoute exact path="/app" component={AppLayout} />
                    <Route path="*"component={() => "404 NOT FOUND"} />
                </Switch>
            {/*    <Switch>*/}
            {/*        <Route history={history} path='/home' component={Home} />*/}
            {/*        <Route history={history} path='/lessons' component={Lessons} />*/}
            {/*        <Redirect from='/' to='/home'/>*/}
            {/*    </Switch>*/}
            </div>
        );
    }
}

export default withRouter(App)