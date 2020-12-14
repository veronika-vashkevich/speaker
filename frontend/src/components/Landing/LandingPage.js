import React, {Component} from 'react'

import './LandingPage.scss'

import Contact from "../Contact/Contact";
import auth from "../Auth/Auth"
import { Link } from "react-router-dom"
import {ReactComponent as Logo} from "../../images/logo-2.svg";
import {ReactComponent as Course} from "../../images/conference.svg";
import LandingTeam from "../Landing/LandingTeam"
import LandingPupils from "../Landing/LandingPupils"
import {ReactComponent as Beginner} from "../../images/beginner.svg";
import {ReactComponent as Continue} from "../../images/continue.svg";
import {ReactComponent as Advanced} from "../../images/advanced.svg";


import { map } from 'underscore'

import '../Home/Home.scss'

import NonAuthenticatedHeader from '../Header/NonAuthenticatedHeader'
import AuthenticationService from "../../services/AuthenticationService";

// const TITLE = 'BigWord'

const SLOGAN = 'Попробуйте наши лучшие курсы!'

const SECTIONS = [
    { title: '5-7 лет НАЧИНАЮЩИЙ', href: '/courses/beginner', Icon: Beginner },
    { title: '8-12 лет ПРОДОЛЖАЮЩИЙ', href: '/courses/continue', Icon: Continue },
    { title: '13-17 лет ПРОДВИНУТЫЙ', href: '/courses/advanced', Icon: Advanced },
    
]

const COURSES = [
    { title: '5-7 лет!', href: '/courses', Icon: Beginner },
    { title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course },
    { title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course },

]


export default class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username:'',
            email: '',
            phone: '',
            showSuccessMessage: false,
        }
        // this.handleChange = this.handleChange.bind(this)
        // this.contactMeClicked = this.contactMeClicked.bind(this)
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    contactMeClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.email, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.email, response.data.token)
                this.props.history.push(`/home`)
            }).catch(() => {
            this.setState({ showSuccessMessage: false })
            this.setState({ hasLoginFailed: true })
        })}

    render() {
        return (
            <div className='Home'>
                <NonAuthenticatedHeader {...this.props}/>
                <div className='Home-Body'>
                    <div className="Landing-Text"> {SLOGAN} </div>
                    <ul> 
                        <li className='SectionNavigation'>

                        {map(SECTIONS, ({ title, href, Icon }) => (
                            // с помощью компонента Link будет осуществляться
                            // навигация по разделам приложения
                            <div className='SectionNavigation-Item Section'>
                            <Link  to={href}>
                                <Icon className='Section-Icon-Big'/>
                                <span className='Section-Title'>{title}</span>
                            </Link>
                                <button className='Header-ExitBtn btn btn-primary bold' onClick={() => { this.props.history.push(href);}}> ПОСМОТРЕТЬ</button>
                            </div>

                        ))}
                    </li>
           
                    </ul>
                    <Contact/>
                    <hr className="my-4" />
                    <LandingPupils />
                    <hr className="my-4" />
                </div>
            </div>
        )
    }


}