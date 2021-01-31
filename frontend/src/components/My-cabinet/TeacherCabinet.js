import './MyCabinet.scss'
import '../../components/Home/Home.scss'
import '../../components/Course/CoursesPage.scss'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import AuthenticationService from "../../services/AuthenticationService";
import Footer from "../Footer/Footer";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";
import TeacherHeader from "../Header/TeacherHeader";
import EmptyCabinet from "./EmptyCabinet";
import React, {Component} from "react";

export default class TeacherCabinet extends Component {

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
                    <AuthenticatedHeader selectedLink="my-cabinet" loggedUser={this.state.loggedUser} {...this.props}/>
                <div className="Home">
                    {AuthenticationService.getLoggedInUserName() !== '' ?
                        <TeacherHeader selectedLink="teacher-courses"/> : <div></div>}
                </div>
                <Footer/>
            </div>
        )
    }
}
