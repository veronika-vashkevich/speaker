import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";

import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import LessonDataService from "../../services/LessonDataService";
import Course from "../Course/Course";
import AuthenticationService from "../../services/AuthenticationService";
import CourseHeader from "../Header/CourseHeader";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";


const beginner = require('../../images/beginner.svg');

export default class BeginnerCoursePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            selectedCourse: "beginner",
            courseId: 1,
            courseName: "\"НАЧИНАЮЩИЙ\"",
            loggedUser: ''
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        console.log('componentWillMount');
        let username = AuthenticationService.getLoggedInUserName();
        LessonDataService.retrieveAllLessons(username, 1) .then(
            response => {
                this.setState({lessons: response.data});
                console.log("executing refreshLessons(1)...");
                console.log("lessons for beginner)...", this.state.lessons);
            }
        );
        this.setState({
            loggedUser: username
        });
    }

        render() {
            return (
                <div>
                    { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="courses" {...this.props}/> :
                        <AuthenticatedHeader  selectedLink="courses" loggedUser={this.state.loggedUser} {...this.props}/>}

                    <div className='Home'>
                        <CourseHeader className="Course-Header" selectedCourse={this.state.selectedCourse}/>
                        <Course
                            classNameValue={`${this.state.selectedCourse === 'beginner' ? 'gallery-courses active' : 'gallery'}`}
                            imgSrc={beginner}
                            desc1="Курс для самых маленьких"
                            desc2="5-7 лет"
                            courseName="'НАЧИНАЮЩИЙ'"
                            selectedCourse="beginner"
                            lessons={this.state.lessons}
                            // onClicked={this.imageBeginnerClick}
                        />
                        <Contact/>
                    </div>
                    <div style={{position: "relative", margin: " 5% auto", alignItems: "center"}}>
                        <Footer />
                    </div>
                </div>
            )
        }
}
