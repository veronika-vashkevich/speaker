import React, {Component} from 'react'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import './CoursesPage.scss'
import Course from  "../Course/Course"
import {ReactComponent as Beginner} from "../../images/beginner.svg";
import  CourseLesson from "../Lessons/CourseLesson"
import LessonDataService from "../../services/LessonDataService";

const beginner = require('../../images/beginner.svg');
const continuer = require('../../images/continue.svg');
const advanced = require('../../images/advanced.svg');




const COURSES = [
    { className: '', title: '5-7 лет!', href: '/courses', Icon: Beginner },
    { title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course },
    { title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course },

]


export default class CoursesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            selectedCourse: 'beginner',
            courseName: "\"НАЧИНАЮЩИЙ\""
        };
        this.imageBeginnerClick = this.imageBeginnerClick.bind(this);
        this.imageContinueClick = this.imageContinueClick.bind(this);
        this.imageAdvancedClick = this.imageAdvancedClick.bind(this);
        this.refreshLessons = this.refreshLessons.bind(this)
    }
    refreshLessons() {
        // let username = AuthenticationService.getLoggedInUserName()
        LessonDataService.retrieveAllLessons()
            .then(
                response => {
                    //console.log(response);
                    this.setState({ lessons: response.data })
                }
            )
    }

    // componentDidMount() {
    //     console.log('componentDidMount')
    //     this.refreshLessons();
    //     console.log(this.state)
    // }
    //
    // componentWillMount() {
    //     console.log('componentWillMount')
    //     this.refreshLessons();
    //     console.log(this.state)
    // }
    // componentDidMount() {
    //     this.setCourseName()
    //     console.log('log from here')
    //     console.log(this.state.courseName)
    // }

    imageBeginnerClick() {
        this.setState(
            {
                selectedCourse: 'beginner',
                courseName: "\"НАЧИНАЮЩИЙ\""
            }
        );
        console.log(this.state.selectedCourse);
        console.log(this.state.courseName);
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
    }

    render() {
        return (
            <div>
                <div>
                    <NonAuthenticatedHeader {...this.props}/>
                    <div className="courses-vertical-container">
                        <Course classNameValue={`topicContainer ${this.state.selectedCourse == 'beginner' ? 'gallery active' : 'gallery'}`}
                                imgSrc={beginner}
                                desc1="Курс для самых маленьких"
                                desc2="5-7 лет"
                                onClicked={this.imageBeginnerClick}
                            />

                        <Course classNameValue={`topicContainer ${this.state.selectedCourse == 'continue' ? 'gallery active' : 'gallery'}`}
                                imgSrc={continuer}
                                desc1="Продолжение курса"
                                desc2="8-12 лет"
                                onClicked={this.imageContinueClick}/>

                        <Course classNameValue={`topicContainer ${this.state.selectedCourse == 'advanced' ? 'gallery active' : 'gallery'}`}
                                imgSrc={advanced}
                                desc1="Продвинутый курс"
                                desc2="13-17 лет"
                                onClicked={this.imageAdvancedClick}/>
                    </div>
                    <CourseLesson courseName={this.state.courseName} selectedCourse={this.state.selectedCourse}/>
                </div>
            </div>
        )
    }
}