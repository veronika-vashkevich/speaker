import React, {Component} from 'react'

import './LandingPage.scss'

import Contact from "../Contact/Contact";
import {Link} from "react-router-dom"
import {ReactComponent as Course} from "../../images/conference.svg";
import LandingPupils from "../Landing/LandingPupils"
import {ReactComponent as Beginner} from "../../images/beginner.svg";
import {ReactComponent as Continue} from "../../images/continue.svg";
import {ReactComponent as Advanced} from "../../images/advanced.svg";


import {map} from 'underscore'

import '../Home/Home.scss'

import NonAuthenticatedHeader from '../Header/NonAuthenticatedHeader'
import Footer from "../Footer/Footer";

const SLOGAN = 'Попробуйте наши лучшие курсы!'

const SECTIONS = [
    {title: '5-7 лет НАЧИНАЮЩИЙ', href: '/courses/beginner', Icon: Beginner, selectedCourse: "beginner", courseId: 1},
    {
        title: '8-12 лет ПРОДОЛЖАЮЩИЙ',
        href: '/courses/continue',
        Icon: Continue,
        selectedCourse: "continue",
        courseId: 2
    },
    {
        title: '13-17 лет ПРОДВИНУТЫЙ',
        href: '/courses/advanced',
        Icon: Advanced,
        selectedCourse: "advanced",
        courseId: 3
    },

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
            showSuccessMessage: false
          
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

    // contactMeClicked() {
    //     ContactMeService
    //         .sendContactMeRequest(this.state.name, this.state.email, this.state.phone);
    //     //     .then((response) => {
    //     //         AuthenticationService.registerSuccessfulLoginForJwt(this.state.email, response.data.token)
    //     //         this.props.history.push(`/home`)
    //     //     }).catch(() => {
    //     //     this.setState({showSuccessMessage: false})
    //     //     this.setState({hasLoginFailed: true})
    //     // })
    // }

    render() {
        return (
            <div >
                <NonAuthenticatedHeader selectedLink="home" /*{...this.props}*//>

                <div className="Body" >
                    <h1 className="Landing-Text"> {SLOGAN} </h1>
                    <ul>
                        <li className='SectionNavigation'>

                            {map(SECTIONS, ({title, href, Icon, selectedCourse, courseId}) => (
                                <div className='SectionNavigation-Item Section'>
                                    <Link to={href}>
                                        <Icon className='Section-Icon-Big'/>
                                        <span className='Section-Title'>{title}</span>
                                    </Link>
                                    <button className='Header-ExitBtn btn btn-primary bold' onClick={() => {
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
                    <Footer/>
                </div>
            </div>
        )
    }


}