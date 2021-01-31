import React, {Component} from 'react'

import './MyCabinet.scss'
import '../../components/Home/Home.scss'
import '../../components/Course/CoursesPage.scss'
import '../../components/Teacher/TeacherCourses.scss';
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import AuthenticationService from "../../services/AuthenticationService";
import Footer from "../Footer/Footer";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";
import EmptyCabinet from "./EmptyCabinet";
import TeacherCourses from "../../components/Teacher/TeacherCourses"

export default class MyCabinet extends Component {

    state = {
        data: null,
        isLoading: false,
        title: '',
        filter: {
            startDate: null,
            endDate: null,
            pupilName: '',
            onlyMe: false
        },
        loggedUser: '',
        userAuthority: ''
    };


    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();
        if (username === '') {
            this.setState({
                title: 'У ВАС ПОКА НЕT ЗАНЯТИЙ'
            })
        } else {
            this.setState({
                title: 'МОИ ЗАНЯТИЯ',
                loggedUser: username
            })

        }

    }


    render() {
        return (
            <div id="container">
                {AuthenticationService.getLoggedInUserName() === '' ?
                    <NonAuthenticatedHeader selectedLink="my-cabinet" {...this.props}/> :
                    <AuthenticatedHeader selectedLink="my-cabinet" loggedUser={this.state.loggedUser} {...this.props}/>}
                <div className="Home">
                    {AuthenticationService.getLoggedInUserName() !== '' ?
                        <TeacherCourses selectedLink="teacher-courses"/>
                        : <div></div>}
                    {AuthenticationService.getLoggedInUserName() === '' ?
                        <EmptyCabinet/> : <div></div>
                    }

                </div>
                <Footer/>
            </div>
        )
    }
}
