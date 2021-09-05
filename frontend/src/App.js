import React, { Component } from 'react';

import {
    Route,
    Switch,
    Redirect,
    BrowserRouter,
    withRouter,
    useHistory
} from "react-router-dom"
import {ProtectedRoute} from "./components/Routes/ProtectedRoute";

import './App.scss';

import Home from './components/Home/Home'
import MyCabinet from './components/My-cabinet/MyCabinet'
import LandingPage from "./components/Landing/LandingPage";
import AppLayout from "./components/Layout/AppLayout"
import LoginPage from "./components/Page/LoginPage";
import RegisterPageV2 from "./components/Page/RegisterPageV2";

import AboutUsPage from "./components/Page/AboutUsPage"
import CreateCoursePage from "./components/Page/CreateCoursePage"
import CreateLessonPage from "./components/Page/CreateLessonPage"
import DeleteLessonPage from "./components/Page/DeleteLessonPage"
import UpdateLessonPage from "./components/Page/UpdateLessonPage"
import CoursesPage from "./components/Course/CoursesPage";
import BeginnerCoursePage from "./components/Page/BiginnerCoursePage"
import ContinueCoursePage from "./components/Page/ContinueCoursePage";
import AdvancedCoursePage from "./components/Page/AdvancedCoursePage";
import AdultCoursePage from "./components/Page/AdultCoursePage";
import ContactsPage from "./components/Page/ContactsPage";


class App extends Component {

    render() {
        // const { history } = this.props

        return (

            <div className="App">
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/app" component={AppLayout} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPageV2} />
                    <Route exact path="/home" component={LandingPage} />
                    <Route exact path="/my-cabinet" component={MyCabinet} />
                    <Route exact path="/courses" component={CoursesPage} />
                    <Route exact path="/courses/beginner" component={BeginnerCoursePage} />
                    <Route exact path="/courses/continue" component={ContinueCoursePage} />
                    <Route exact path="/courses/advanced" component={AdvancedCoursePage} />
                    <Route exact path="/courses/adult" component={AdultCoursePage} />
                    <Route exact path="/about-us" component={AboutUsPage} />
                    <Route exact path="/my-cabinet/create-course" component={CreateCoursePage} />
                    <Route exact path="/my-cabinet/create-lesson" component={CreateLessonPage} />
                    <Route exact path="/my-cabinet/delete-lesson" component={DeleteLessonPage} />
                    <Route exact path="/my-cabinet/delete-lesson" render={(props) => <DeleteLessonPage {...props} item={this.item}/>}  />
                    <Route exact path="/my-cabinet/update-lesson" render={(props) => <UpdateLessonPage {...props} item={this.item}/>}  />
                    <Route exact path="/contacts" component={ContactsPage} />
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
