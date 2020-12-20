import React, { Component } from 'react'

import { Form } from 'reactstrap'
import Moment from 'react-moment'
import { map, filter } from 'underscore'
import { Button } from 'reactstrap'

import './Lessons.scss'
import { lessons as data } from '../../lib/server/ServerData'

import Table from '../Table/Table'
import Header from '../Header/Header'
import Loader from '../Loader/Loader'
import TextField from '../Form/TextField/TextField'
import DateField from '../Form/DateField/DateField'
import CheckboxField from '../Form/CheckboxField/CheckboxField'

import service from '../../services/LessonService'

import { ReactComponent as Search } from '../../images/search.svg'
import { ReactComponent as Lesson } from '../../images/lessons.svg'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import AuthenticationService from "../../services/AuthenticationService";


const USER = 'Иванов Иван Иванович';
const TITLE = 'efe';
export default class Lessons extends Component {

    state = {
        data: null,
        isLoading: false,
        title: '',

        filter: {
            startDate: null,
            endDate: null,
            pupilName: '',
            onlyMe: false
        }
    };

    
    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();
        if (username==''){
            this.setState({
                title: 'У ВАС ПОКА НЕT ЗАНЯТИЙ'
                     })
        }else{
            this.setState({
                title: 'МОИ ЗАНЯТИЯ'
            })
           
        }
    }

    // onChangeFilterField = (name, value) => {
    //     const { filter } = this.state
    //
    //     this.setState({
    //         filter: { ...filter, ...{ [name]: value } }
    //     })
    // }
    //
    // onChangeFilterDateField = (name, value) => {
    //     const { filter } = this.state
    //
    //     this.setState({
    //         filter: { ...filter, ...{ [name]: value && value.getTime() } }
    //     })
    // }
    //
    // onSearch = () => {
    //     this.load()
    // }
    //
    // load() {
    //     this.setState({ isLoading: true })
    //
    //     service
    //         .find({ filter: this.state.filter })
    //         .then(({ success, data }) => {
    //             if (success) {
    //                 this.setState({
    //                     data, isLoading: false
    //                 })
    //             }
    //         })
    // }

    render() {
        const {
            data,
            isLoading,
            filter: {
                startDate,
                endDate,
                clientName,
                onlyMe,
            }
        } = this.state

        return (
            <div className='Lessons'>
                <NonAuthenticatedHeader {...this.props}/>
                <div className="container">{this.state.title}</div>
                {/*<Header*/}
                {/*    title={TITLE}*/}
                {/*    userName={USER}*/}
                {/*    className='Lessons-Header'*/}
                {/*    bodyClassName='Lessons-HeaderBody'*/}
                {/*    renderIcon={() => (*/}
                {/*        <Lesson className='Header-Icon' />*/}
                {/*    )}*/}
                {/*    {... this.props}*/}
                {/*/>*/}
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
                                placeholder='ПО'
                                className='Lessons-FilterField'
                                onChange={this.onChangeFilterDateField}
                            />
                            <TextField
                                name='clientName'
                                value={clientName}
                                placeholder='КЛЮЧЕВОЕ СЛОВО'
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
                            <Button
                                className='Lessons-SearchBtn'
                                onClick={this.onSearch}>
                                <Search className='Lessons-SearchBtnIcon'/>
                            </Button>
                        </Form>
                    </div>
                    {isLoading ? (
                        <Loader />
                    ) : data ? (
                        <Table
                            data={data}
                            className='LessonList'
                            columns={[
                                {
                                    dataField: 'date',
                                    text: 'Дата',
                                    headerStyle: {
                                        width: '150px'
                                    },
                                    formatter: (v, row) => {
                                        return (
                                            <Moment date={v} format='DD.MM.YYYY HH.mm' />
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
                    ) : 'Нет данных'}
                </div>
            </div>
        )
    }
}