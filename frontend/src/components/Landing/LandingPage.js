import React, {Component} from 'react'

import './LandingPage.scss'

import auth from "../Auth/Auth"
import { Link } from "react-router-dom"
import {ReactComponent as Logo} from "../../images/logo.svg";
import {ReactComponent as Course} from "../../images/conference.svg";
import LandingTeam from "../Landing/LandingTeam"
import LandingPupils from "../Landing/LandingPupils"

import { map } from 'underscore'

import '../Home/Home.scss'

import NonAuthenticatedHeader from '../Header/NonAuthenticatedHeader'

// const TITLE = 'BigWord'

const SLOGAN = 'Попробуйте наши лучшие курсы!'

const SECTIONS = [
    { title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course },
]

export default class LandingPage extends Component {
    
    render() {
        return (
            <div className='Home'>
                <NonAuthenticatedHeader {...this.props}/>
                <div className='Home-Body'>
                    <div className='SectionNavigation'>
                       
                        {map(SECTIONS, ({ title, href, Icon }) => (
                            // с помощью компонента Link будет осуществляться
                            // навигация по разделам приложения
                            <Link className='SectionNavigation-Item Section' to={href}>
                                <Icon className='Section-Icon-Big'/>
                            </Link>
                            
                        ))}
                    </div>
                    <div className="Landing-Text"> {SLOGAN} </div>
                    <hr className="my-4" />
                    <LandingPupils />
                    <hr className="my-4" />
                    <LandingTeam />
                </div>
            </div>
        )
    }


}