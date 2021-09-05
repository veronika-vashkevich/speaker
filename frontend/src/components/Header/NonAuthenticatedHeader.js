import React, { Component } from 'react'

import cn from 'classname'
import './Header.scss'
import SchoolLogo from './SchoolLogo'



export default class NonAuthenticatedHeader extends Component {
    render () {
        const {
            className,
            selectedLink
         } = this.props;

        return (
            <header className={cn('Header', className)}>
                <div className='Header-Body'>
                        <SchoolLogo  style={{position: "fixed"}} {...this.props}/>
                        <div className="topnav">
                            <a  className={this.props.selectedLink === 'home' ? 'active-course-header' : ''} href="/home">Домашняя</a>
                            <a  className={this.props.selectedLink === 'courses' ? 'active-course-header' : ''} href="/courses">Курсы</a>
                            <a  className={this.props.selectedLink === 'my-cabinet' ? 'active-course-header' : ''} href="/my-cabinet">Мой кабинет</a>
                            <a  className={this.props.selectedLink === 'about-us' ? 'active-course-header' : ''} href="/about-us">О нас</a>
                            <a  className={this.props.selectedLink === 'contacts' ? 'active-course-header' : ''} href="/contacts">Контакты</a>*/
                        </div>
                    /* uncomment me 1
                        {/*<div className="header-btn">*/}
                        {/*    <button className='Header-ExitBtn btn btn-primary bold'*/}
                        {/*            onClick={() => { this.props.history.push("/login")}}>*/}
                        {/*        Войти*/}
                        {/*    </button>*/}
                        {/*    <button className='Header-ExitBtn btn btn-primary bold'*/}
                        {/*            onClick={() => { this.props.history.push("/register")}}>*/}
                        {/*        Зарегистрироваться*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                </div>
            </header>
        )
    }


}
