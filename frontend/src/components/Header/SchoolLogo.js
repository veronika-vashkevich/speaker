import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {ReactComponent as Logo} from "../../images/logo.svg";

import './Header.scss'
import cn from "classname";
const TITLE = 'BigWord'


export default class  SchoolLogo extends Component {

    render () {
        const {
            className
        } = this.props

        return (
            <div className='Home'>
                <div className={cn('Header', className)}>
                    <div className='Home-Header flex-1 d-flex flex-row justify-content-start align-items-center'>
                        <Logo className='Header-Icon'/>
                        
                        <div className='Header-Title'>
                            {TITLE}
                        </div>
                    </div>
                </div>
            </div>
            

        )
    }
}
