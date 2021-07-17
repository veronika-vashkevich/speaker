import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {ReactComponent as Logo} from "../../images/logo.svg";
import logo from '../../images/logo.jpg'

import './Header.scss'
import cn from "classname";



export default class  SchoolLogo extends Component {

    render () {
        const {
            className
        } = this.props

        return (
                    <div>
                        <Link  to="/">
                            <img   src={logo} href="/" width="110" height="80" />
                        </Link>
                    </div>
            

        )
    }
}
