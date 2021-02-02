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
                        <div style={{position: "absolute", right: "30px", display: "inline"}}>
                            <button className='Header-ExitBtn btn btn-primary bold' >
                                Изменить урок
                            </button>
                            <button className='Header-ExitBtn btn btn-primary bold' >
                                Обновить урок
                            </button>
                        </div>

                    </div>
        )
    }
}
