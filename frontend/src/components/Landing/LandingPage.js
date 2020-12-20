import React, {Component} from 'react'

import './LandingPage.scss'

import Contact from "../Contact/Contact";
import auth from "../Auth/Auth"
import {Link} from "react-router-dom"
import {ReactComponent as Logo} from "../../images/logo-2.svg";
import {ReactComponent as Course} from "../../images/conference.svg";
import LandingTeam from "../Landing/LandingTeam"
import LandingPupils from "../Landing/LandingPupils"
import {ReactComponent as Beginner} from "../../images/beginner.svg";
import {ReactComponent as Continue} from "../../images/continue.svg";
import {ReactComponent as Advanced} from "../../images/advanced.svg";


import {map} from 'underscore'

import '../Home/Home.scss'

import NonAuthenticatedHeader from '../Header/NonAuthenticatedHeader'
import AuthenticationService from "../../services/AuthenticationService";
import LessonDataService from "../../services/LessonDataService";

// const TITLE = 'BigWord'

const SLOGAN = 'Попробуйте наши лучшие курсы!'

const SECTIONS = [
    {title: '5-7 лет НАЧИНАЮЩИЙ', href: '/courses', Icon: Beginner, selectedCourse: "beginner", courseId: 1},
    {title: '8-12 лет ПРОДОЛЖАЮЩИЙ', href: '/courses', Icon: Continue, selectedCourse: "continue", courseId: 2},
    {title: '13-17 лет ПРОДВИНУТЫЙ', href: '/courses', Icon: Advanced, selectedCourse: "advanced", courseId: 3},

];

const COURSES = [
    {title: '5-7 лет!', href: '/courses', Icon: Beginner},
    {title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course},
    {title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course},

];


export default class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            phone: '',
            showSuccessMessage: false,
        };
        this.redirect = this.redirect.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    redirect(href, selectedCourse, courseId) {
        console.log("this is redirect");
        console.log("selectedCourse is ", selectedCourse);
        console.log("courseId is ", courseId);
        this.props.history.push({
            pathname: href,
            state: {selectedCourse: selectedCourse, courseId: courseId}
        });
    }

    contactMeClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.email, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.email, response.data.token)
                this.props.history.push(`/home`)
            }).catch(() => {
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        })
    }

    render() {
        return (
            <div>
                <NonAuthenticatedHeader {...this.props}/>

                <div className='Home'>
                    <div className="Landing-Text"> {SLOGAN} </div>
                    <ul>
                        <li className='SectionNavigation'>

                            {map(SECTIONS, ({title, href, Icon, selectedCourse, courseId}) => (
                                <div className='SectionNavigation-Item Section'>
                                    <Link to={href}>
                                        <Icon className='Section-Icon-Big' />
                                        <span className='Section-Title' >{title}</span>
                                    </Link>
                                    <button className='Header-ExitBtn btn btn-primary bold'  onClick={() => {
                                        this.redirect(href, selectedCourse, courseId)
                                    }}> ПОСМОТРЕТЬ
                                    </button>
                                </div>

                            ))}
                        </li>

                    </ul>
                    <Contact/>
                    <hr className="my-4"/>
                    <LandingPupils/>
                    <hr className="my-4"/>
                    

            </div>
            </div>
        )
    }


}