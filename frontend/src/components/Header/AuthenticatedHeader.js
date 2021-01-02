import React, { Component } from 'react'

import cn from 'classname'
import './Header.scss'
import SchoolLogo from './SchoolLogo'
import AuthenticationService from "../../services/AuthenticationService";



export default class AuthenticatedHeader extends Component {


    render () {
        const {
            className,
            selectedLink,
            loggedUser
         } = this.props;

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header className={cn('Header', className)}>
                <div className='Header-Body'>
                        <SchoolLogo  style={{position: "fixed"}} {...this.props}/>
                        <div className="topnav">
                            <a  className={this.props.selectedLink === 'home' ? 'active-course-header' : ''} href="/home">Домашняя</a>
                            <a  className={this.props.selectedLink === 'courses' ? 'active-course-header' : ''} href="/courses">Курсы</a>
                            <a  className={this.props.selectedLink === 'my-lessons' ? 'active-course-header' : ''} href="/my-lessons">Мой кабинет</a>
                            <a  className={this.props.selectedLink === 'about-us' ? 'active-course-header' : ''} href="/about-us">О нас</a>
                            <a className={this.props.selectedLink === 'contacts' ? 'active-course-header' : ''} href="/contacts">Контакты</a>
                        </div>
                        <div  className="header-btn" style={{color: "black"}}>{this.props.loggedUser}</div>
                        <div className="header-btn">
                            <button className='Header-ExitBtn btn btn-primary bold' onClick={() => {AuthenticationService.logout();
                           // this.props.history.pushState(null, '/home');
                            this.props.history.push("/home")}
                           // this.context.history.push("/home")}
                            } >Выйти
                            </button>
                            {/*<button className='Header-ExitBtn btn btn-primary bold'>*/}
                            {/*    Зарегистрироваться*/}
                            {/*</button>*/}
                        </div>
                </div>
            </header>
        )
    }


}
