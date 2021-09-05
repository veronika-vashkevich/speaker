import React, {Component} from 'react'

import './LandingPage.scss'

import Contact from "../Contact/Contact";
import {Link} from "react-router-dom"
import {ReactComponent as Beginner} from "../../images/beginner.svg";
import {ReactComponent as Continue} from "../../images/continue.svg";
import {ReactComponent as Advanced} from "../../images/advanced.svg";
import {ReactComponent as Adult} from "../../images/adult.svg";


import {map} from 'underscore'

import '../Home/Home.scss'

import NonAuthenticatedHeader from '../Header/NonAuthenticatedHeader'
import AuthenticatedHeader from '../Header/AuthenticatedHeader'
import Footer from "../Footer/Footer";
import AuthenticationService from "../../services/AuthenticationService";
import CustomSlider from "../Feedback/CustomSlider";


const SLOGAN = 'Попробуйте наши лучшие курсы!';
const BEGINNER_DESCRIPTION_OLD = '6-13 лет \n Курс Beginners Kids \n (начинающие дети)';
const CONTINUE_DESCRIPTION_OLD = '6-16 лет \n Курс Intermediate \n (продолжающие)';
const ADVANCED_DESCRIPTION_OLD = '6-16 лет \n Курс Intermediate+Reading \n (продолжающие + чтение)';
const ADULT_DESCRIPTION_OLD = 'от 13 лет \n Курс Adult Beginners \n (начинающие взрослые)';
const SECTIONS = [
    {   title: BEGINNER_DESCRIPTION_OLD.split('\n').map(i => {return <p>{i}</p>}),
        href: '/courses/beginner',
        Icon: Beginner,
        selectedCourse: "beginner",
        courseId: 1
    },
    {
        title: CONTINUE_DESCRIPTION_OLD.split('\n').map(i => {return <p>{i}</p>}),
        href: '/courses/continue',
        Icon: Continue,
        selectedCourse: "continue",
        courseId: 2
    },
    {
        title: ADVANCED_DESCRIPTION_OLD.split('\n').map(i => {return <p>{i}</p>}),
        href: '/courses/advanced',
        Icon: Advanced,
        selectedCourse: "advanced",
        courseId: 3
    },
    {
        title: ADULT_DESCRIPTION_OLD.split('\n').map(i => {return <p>{i}</p>}),
        href: '/courses/adult',
        Icon: Adult,
        selectedCourse: "adult",
        courseId: 4
    }
];

export default class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            phone: '',
            loggedUser: '',
            showSuccessMessage: false

        };
        this.redirect = this.redirect.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    componentWillMount() {
        let user = AuthenticationService.getLoggedInUserName();
        this.setState({
            loggedUser: user
        });
    }

    redirect(href, selectedCourse, courseId) {
        this.props.history.push({
            pathname: href,
            state: {selectedCourse: selectedCourse, courseId: courseId}
        });
    }

    render() {
        return (
            <div className="position-relative">
                {this.state.loggedUser === '' ? <NonAuthenticatedHeader history={this.props.history} selectedLink="home" {...this.props}/> :
                    <AuthenticatedHeader  selectedLink="home" loggedUser={this.state.loggedUser} {...this.props}/>}
                <div className="Home Body">
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
                    <CustomSlider/>
                    <Footer/>
                </div>
            </div>
        )
    }
}
