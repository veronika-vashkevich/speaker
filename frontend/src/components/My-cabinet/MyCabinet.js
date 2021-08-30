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
import TeacherCabinet from "../Teacher/TeacherCabinet"
import StudentCabinet from "../Student/StudentCabinet"

export default class MyCabinet extends Component {

    state = {
        data: null,
        isLoading: false,
        title: '',
        authority: '',
        response:'',
        filter: {
            startDate: null,
            endDate: null,
            pupilName: '',
            onlyMe: false
        },
        loggedUser: ''
    };

    componentDidMount(){
        // console.log("my-cabinet authority", this.state.authority);
        // console.log("my-cabinet response", this.state.response);
    }

    componentWillMount() {
        let username = AuthenticationService.getLoggedInUserName();
        if (username === '') {
            this.setState({
                title: 'У ВАС ПОКА НЕT ЗАНЯТИЙ'
            })
        } else {
            console.log("I am here");

            AuthenticationService.getUserAuthority(username)
                .then(
                    (response) => {
                        if (response.status === 200) {
                            console.log("response OK ", response);
                           // this.setState({authority: response.data,  response: response});

                            this.setState({authority: response.data.authorityType}, () => {
                                console.log("my-cabinet authority", this.state.authority);
                            });

                        }

                    }
                );
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
                    {AuthenticationService.getLoggedInUserName() !== ''  && this.state.authority === 'TEACHER'?
                        <TeacherCabinet loggedUser={this.state.loggedUser} {...this.props} selectedLink="teacher-courses"/>
                        : <div></div>}

                    {AuthenticationService.getLoggedInUserName() !== ''  && this.state.authority === 'STUDENT'?
                        <StudentCabinet loggedUser={this.state.loggedUser} {...this.props} selectedLink="student-courses"/>
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
