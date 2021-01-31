import React, { Component } from 'react'

import cn from 'classname'
import './Header.scss'
import SchoolLogo from './SchoolLogo'
import AuthenticationService from "../../services/AuthenticationService";



export default class TeacherHeader extends Component {


    render () {
        const {
            className,
            selectedLink,
            loggedUser
        } = this.props;

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
                    <div className="Teacher-Header">
                        <a  className={this.props.selectedLink === 'teacher-courses' ? 'active-course-header' : ''} /*href="/teacher-courses"*/>Ваши Курсы</a>
                        {/*<a  className={this.props.selectedLink === 'teacher-lessons' ? 'active-course-header' : ''} href="/teacher-lessons">Уроки</a>*/}
                    </div>
        )
    }
}
