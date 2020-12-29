import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import CourseHeader from "../Header/CourseHeader";

import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import '../Course/CoursesPage.scss'
import LessonDataService from "../../services/LessonDataService";
import Course from "../Course/Course";
import AuthenticationService from "../../services/AuthenticationService";


const advanced = require('../../images/advanced.svg');

export default class AdvancedCoursePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            selectedCourse: "advanced",
            courseId: 3,
            courseName: "\"ПРОДВИНУТЫЙ\""
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
  
        console.log('componentWillMount');
        let username = AuthenticationService.getLoggedInUserName();
        LessonDataService.retrieveAllLessons(username, 3).then(
            response => {
                this.setState({lessons: response.data});
                console.log("executing refreshLessons(3)...");
                console.log("lessons for advanced)...", this.state.lessons);
            }
        )
    }

    render() {
        return (
            <div>
                { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="courses" {...this.props}/> : <div></div> }
                <div className='Home'>
                    <CourseHeader className="Course-Header" selectedCourse={this.state.selectedCourse}/>
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'advanced' ? 'gallery active' : 'gallery'}`}
                        imgSrc={advanced}
                        desc1="Продвинутый курс"
                        desc2="13-17 лет"
                        courseName="'ПРОДВИНУТЫЙ'"
                        selectedCourse="advanced"
                        lessons={this.state.lessons}
                    />
                    <Contact />
                </div>
                <div style={{position: "relative", margin: " 5% auto", alignItems: "center"}}>
                    <Footer />
                </div>
            </div>
        )
    }
}