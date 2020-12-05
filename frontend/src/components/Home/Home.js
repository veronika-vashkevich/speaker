import React, { Component } from 'react'

import { map } from 'underscore'
import { Link } from "react-router-dom"

import './Home.scss'

import Header from '../Header/Header'

import { ReactComponent as Performance } from '../../images/performance.svg'
import { ReactComponent as House } from '../../images/house.svg'
import { ReactComponent as Pupils } from '../../images/pupils.svg'
import { ReactComponent as Payments } from '../../images/payments.svg'
import { ReactComponent as Broadcast } from '../../images/broadcast.svg'
import { ReactComponent as Teachers } from '../../images/teachers.svg'
import { ReactComponent as Lesson } from '../../images/lessons.svg'

const TITLE = 'Домашняя'

const SECTIONS = [
    { title: 'Уроки', href: '/lessons', Icon: Lesson },
    { title: 'Успеваемость', href: '/performance', Icon: Performance  },
    { title: 'Оплаты', href: '/payments', Icon: Payments },
    { title: 'Ученики', href: '/pupils', Icon: Pupils },
    { title:' Преподаватели', href: '/teachers', Icon: Teachers }
]

export default class Home extends Component {

    render () {
        return (
            <div className='Home'>
                <Header
                    title={TITLE}
                    userName='Иванов Иван Иванович'
                    className='Home-Header'
                    renderIcon={() => (
                        <House className='Header-Icon'/>
                    )}
                />
                <div className='Home-Body'>
                    <div className='SectionNavigation'>
                        {map(SECTIONS, ({ title, href, Icon }) => (
                            // с помощью компонента Link будет осуществляться
                            // навигация по разделам приложения
                            <Link className='SectionNavigation-Item Section' to={href}>
                                <Icon className='Section-Icon'/>
                                <span className='Section-Title'>{title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}