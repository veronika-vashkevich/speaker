import React, { Component } from 'react'

import cn from 'classname'
import auth from '../Auth/Auth'
import './Header.scss'
import SchoolLogo from './SchoolLogo'



export default class NonAuthenticatedHeader extends Component {


    render () {
        const {
            className
         } = this.props

        return (
            <div className={cn('Header', className)}>
                <div className='Header-Body'>
                    <SchoolLogo {...this.props}/>
                    <div className='flex-1 d-flex flex-row justify-content-end align-items-end'>
                        if(!auth.isAuthenticated()){
                        <h1>NOT AUTHENTICTAED </h1>
                    }
                        <button className='Header-ExitBtn btn btn-primary 'onClick={() => {
                                this.props.history.push("/login");
                       
                        }}
                        >
                            Войти
                        </button>
                        <button className='Header-ExitBtn btn btn-primary '>
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        )
    }


}
