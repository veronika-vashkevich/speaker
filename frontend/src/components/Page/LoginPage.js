import React, { Component } from 'react'
import '../Header/Header.scss'
import cn from 'classname'
import SchoolLogo from '../Header/SchoolLogo'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import {ReactComponent as Logo} from "../../images/logo.svg";
const TITLE = 'BigWord'

export default class  LoginPage extends Component {
    

    render () {
        const {
            className
        } = this.props

        return (

            <div className='Home'>
                <SchoolLogo {...this.props}
                    title={TITLE}
                    className='Home-Header'
                    renderIcon={() => (
                        <Logo className='Header-Icon'/>
                        )}
                />
            </div>
        )
    }
}