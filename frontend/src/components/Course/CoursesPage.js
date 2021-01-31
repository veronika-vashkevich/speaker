import React, {Component} from 'react'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Course from "../Course/Course"
import '../../components/Header/Header.scss'
import {ReactComponent as Beginner} from "../../images/beginner.svg";
import LessonDataService from "../../services/LessonDataService";
import AuthenticationService from "../../services/AuthenticationService"
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";

const beginner = require('../../images/beginner.svg');
const continuer = require('../../images/continue.svg');
const advanced = require('../../images/advanced.svg');


const COURSES = [
    {className: '', title: '5-7 лет!', href: '/courses', Icon: Beginner},
    {title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course},
    {title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course},

]


export default class CoursesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            beginnerLessons: [],
            continueLessons: [],
            advancedLessons: [],
            selectedCourse: 'beginner',
            courseId: 1,
            courseName: "\"НАЧИНАЮЩИЙ\"",
            loggedUser: ''
        };
        this.imageBeginnerClick = this.imageBeginnerClick.bind(this);
        this.imageContinueClick = this.imageContinueClick.bind(this);
        this.imageAdvancedClick = this.imageAdvancedClick.bind(this);
        this.refreshLessons = this.refreshLessons.bind(this);
        this.refreshAllLessons = this.refreshAllLessons.bind(this);
    }

    refreshAllLessons() {
        console.log("executing refreshAllLessons()...");
        this.refreshLessons(1);
        this.refreshLessons(2);
        this.refreshLessons(3);

    }

    refreshLessons(courseId) {
        let username = AuthenticationService.getLoggedInUserName();
        // console.log("username");
        // console.log(username);
        LessonDataService.retrieveAllLessons(username, courseId)
            .then(
                response => {
                    console.log(response);
                    if (courseId === 1) {
                        this.setState({beginnerLessons: response.data});
                        console.log("executing refreshLessons(1)...");
                        console.log("lessons for beginner)...", this.state.beginnerLessons);
                    } else if (courseId === 2) {
                        this.setState({continueLessons: response.data});
                        console.log("executing refreshLessons(2)...");
                        console.log("lessons for continue)...", this.state.continueLessons);
                    } else if (courseId === 3) {
                        this.setState({advancedLessons: response.data});
                        console.log("executing refreshLessons(3)...");
                        console.log("lessons for advanced)...", this.state.advancedLessons);
                    }

                }
            )
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.refreshAllLessons();
        let loggedUser = AuthenticationService.getLoggedInUserName();
        this.setState({
            loggedUser: loggedUser
        });
        console.log('loggedUser', loggedUser );
    }

    imageBeginnerClick() {
        this.setState(
            {
                selectedCourse: 'beginner',
                courseName: "\"НАЧИНАЮЩИЙ\""
            }
        );
        console.log(this.state.selectedCourse);
        console.log(this.state.courseName);
        this.refreshLessons(1);

    }

    imageContinueClick() {
        this.setState(
            {
                selectedCourse: 'continue',
                courseName: "\"ПРОДОЛЖАЮЩИЙ\""
            }
        );
        console.log(this.state.selectedCourse);
        console.log(this.state.courseName);
        this.refreshLessons(2);
    }

    imageAdvancedClick() {
        this.setState(
            {
                selectedCourse: 'advanced',
                courseName: "\"ПРОДВИНУТЫЙ\""
            }
        )

        console.log(this.state.selectedCourse);
        console.log(this.state.courseName);
        this.refreshLessons(3);
    }


    render() {
        return (
            <div className="position-relative">
                { this.state.loggedUser === ''? <NonAuthenticatedHeader selectedLink="courses" {...this.props}/> :
                    <AuthenticatedHeader selectedLink="courses" loggedUser={this.state.loggedUser} {...this.props}/>}
                <div className='Home'>
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'beginner' ? 'gallery-courses active' : 'gallery-courses'}`}
                        imgSrc={beginner}
                        desc1="Курс для самых маленьких"
                        desc2="5-7 лет"
                        courseName="'НАЧИНАЮЩИЙ'"
                        selectedCourse="beginner"
                        lessons={this.state.beginnerLessons}
                        onClicked={this.imageBeginnerClick}
                    />
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'continue' ? 'gallery-courses active' : 'gallery-courses'}`}
                        imgSrc={continuer}
                        desc1="Продолжение курса"
                        desc2="8-12 лет"
                        courseName="'ПРОДОЛЖАЮЩИЙ'"
                        selectedCourse="continue"
                        lessons={this.state.continueLessons}
                        onClicked={this.imageContinueClick}/>

                    <Course
                        classNameValue={`${this.state.selectedCourse === 'advanced' ? 'gallery-courses active' : 'gallery-courses'}`}
                        imgSrc={advanced}
                        desc1="Продвинутый курс"
                        desc2="13-17 лет"
                        courseName="'ПРОДВИНУТЫЙ'"
                        selectedCourse="advanced"
                        lessons={this.state.advancedLessons}
                        onClicked={this.imageAdvancedClick}/>
                    <Contact/>
                </div>
                <div style={{position: "relative", margin: " 5% auto", alignItems: "center"}}>
                    <Footer />
                </div>
            </div>

        )
    }
}
