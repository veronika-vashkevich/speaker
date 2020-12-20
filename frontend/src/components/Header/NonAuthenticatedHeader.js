import React, { Component } from 'react'

import cn from 'classname'
import auth from '../Auth/Auth'
import './Header.scss'
import SchoolLogo from './SchoolLogo'
import { Link } from 'react-router-dom'



export default class NonAuthenticatedHeader extends Component {


    render () {
        const {
            className
         } = this.props

        return (
            <div className={cn('Header', className)}>
                <div className='Header-Body'>
                        <SchoolLogo  style={{position: "fixed"}} {...this.props}/>
                        <div className="topnav">
                            <a href="/home">Домашняя</a>
                            <a href="/courses">Курсы</a>
                            <a href="/my-cabinet">Мой кабинет</a>
                            <a href="/about-us">О нас</a>
                            <a href="/contacts">Контакты</a>
                        </div>
                        <div className="header-btn">
                            <button className='Header-ExitBtn btn btn-primary bold ' onClick={() => { this.props.history.push("/login");}} >Войти
                            </button>
                            <button className='Header-ExitBtn btn btn-primary bold '>
                                Зарегистрироваться
                            </button>
                        </div>
                </div>
            </div>
        )
    }


}
