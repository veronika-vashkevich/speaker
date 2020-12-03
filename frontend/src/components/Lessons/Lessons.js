import React, { Component } from 'react'

import {Form} from 'reactstrap'
import Moment from 'react-moment'
import {map, filter} from 'underscore'

import Table from '../Table/Table'
import Header from '../Header/Header'
import TextField from '../Form/TextField/TextField'
import DateField from '../Form/DateField/DateField'
import CheckboxField from '../Form/CheckboxField/CheckboxField'

import './Lessons.scss'

import { ReactComponent as Lesson } from '../../images/lessons.svg'

import { lessons as data } from '../../lib/MockData'

const TITLE = 'Уроки'
const USER = 'Иванов Иван Иванович'

export default class Lessons extends Component {

    state = {
        filter: {
            startDate: null,
            endDate: null,
            pupilName: '',
            onlyMe: false
        }
    }

    onChangeFilterField = (name, value) => {
        const { filter } = this.state

        this.setState({
            filter: {...filter, ...{[name]: value}}
        })
    }

    onChangeFilterDateField = (name, value) => {
        const { filter } = this.state

        this.setState({
            filter: {...filter, ...{[name]: value && value.getTime()}}
        })
    }

    render() {
        const {
            startDate,
            endDate,
            pupilName,
            onlyMe,
        } = this.state.filter

        let filtered = filter(data, o => {
            return (startDate ? o.date >= startDate : true) &&
                (endDate ? o.date <= endDate : true) &&
                (pupilName ? (pupilName.length > 2 ? o.pupilName.includes(pupilName) : true) : true) &&
                (onlyMe ? o.holderName === USER : true)
        })

        return (
            <div className='Lessons'>
                <Header
                    title={TITLE}
                    userName={USER}
                    className='Lessons'
                    bodyClassName='Lessons-HeaderBody'
                    renderIcon={() => (
                        <Lesson className='Header-Icon' />
                    )}
                />
                <div className='Lessons-Body'>
                    <div className='Lessons-Filter'>
                        <Form className='Lessons-FilterForm'>
                            <DateField
                                hasTime
                                name='startDate'
                                value={startDate}
                                dateFormat='dd/MM/yyyy HH:mm'
                                timeFormat='HH:mm'
                                placeholder='С'
                                className='Lessons-FilterField'
                                onChange={this.onChangeFilterDateField}
                            />
                            <DateField
                                hasTime
                                name='endDate'
                                value={endDate}
                                dateFormat='dd/MM/yyyy HH:mm'
                                timeFormat='HH:mm'
                                placeholder='По'
                                className='Lessons-FilterField'
                                onChange={this.onChangeFilterDateField}
                            />
                            <TextField
                                name='pupilName'
                                value={pupilName}
                                placeholder='Ученик'
                                className='Lessons-FilterField'
                                onChange={this.onChangeFilterField}
                            />
                            <CheckboxField
                                name='onlyMe'
                                label='Только я'
                                value={onlyMe}
                                className='Lessons-FilterField'
                                onChange={this.onChangeFilterField}
                            />
                        </Form>
                    </div>
                    <Table
                        data={filtered}
                        className='LessonList'
                        columns={[
                            {
                                dataField: 'date',
                                text: 'Дата',
                                headerStyle: {
                                    width: '200px'
                                },
                                formatter: (v, row) => {
                                    return (
                                        <Moment date={v} format='DD.MM.YYYY HH.mm'/>
                                    )
                                }
                            },
                            {
                                dataField: 'pupilName',
                                text: 'Ученик',
                                headerStyle: {
                                    width: '300px'
                                }
                            },
                            {
                                dataField: 'teacherName',
                                text: 'Преподаватель',
                                headerStyle: {
                                    width: '300px'
                                }
                            },
                            {
                                dataField: 'lessonNumber',
                                text: 'Номер урока',
                                headerStyle: {
                                    width: '300px'
                                }
                            },
                            {
                                dataField: 'lessonsLeft',
                                text: 'Уроков осталось',
                                headerStyle: {
                                    width: '300px'
                                }
                            },
                            {
                                    dataField: 'lessonMark',
                                text: 'Оценка за урок',
                                headerStyle: {
                                    width: '300px'
                                }
                            },
                            {
                                    dataField: 'notes',
                                text: 'Примечания',
                                headerStyle: {
                                    width: '300px'
                                }
                            },
                            {
                                dataField: 'paid',
                                text: 'Оплачено',
                                headerStyle: {
                                    width: '300px'
                                }
                            }
                        ]}
                    />
                </div>
            </div>
        )
    }
}