import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";

import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import LessonDataService from "../../services/LessonDataService";
import Course from "../Course/Course";
import AuthenticationService from "../../services/AuthenticationService";
import CourseHeader from "../Header/CourseHeader";
import '../../components/Home/Home.scss'
import "../Course/CoursesPage.scss"


const continuer = require('../../images/continue.svg');

export default class BeginnerCoursePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            selectedCourse: "continue",
            courseId: 2,
            courseName: "\"ПРОДОЛЖАЮЩИЙ\""
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        console.log('componentWillMount');
        let username = AuthenticationService.getLoggedInUserName();
        LessonDataService.retrieveAllLessons(username, 2) .then(
            response => {
                this.setState({lessons: response.data});
                console.log("executing refreshLessons(2)...");
                console.log("lessons for continue)...", this.state.lessons);
            }
        )
    }

    render() {
        return (
            <div>
                <NonAuthenticatedHeader  selectedLink="courses"  {...this.props}/>

                <div className='Home' >
                    <CourseHeader className="Course-Header" selectedCourse={this.state.selectedCourse}/>
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'continue' ? 'gallery active' : 'gallery'}`}
                        imgSrc={continuer}
                        desc1="Продолжение курс"
                        desc2="8-12 лет"
                        courseName="'ПРОДОЛЖАЮЩИЙ'"
                        selectedCourse="continue"
                        lessons={this.state.lessons}
                    />
                    <div className="container"></div>
                    <Contact/>
                </div>
                <Footer/>
            </div>
        )
    }
}