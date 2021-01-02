import React, {Component} from 'react'

import {Button, Form} from 'reactstrap'
import Moment from 'react-moment'

import './Lessons.scss'
import '../../components/Home/Home.scss'
import '../../components/Course/CoursesPage.scss'

import Table from '../Table/Table'
import Loader from '../Loader/Loader'
import TextField from '../Form/TextField/TextField'
import DateField from '../Form/DateField/DateField'

import {ReactComponent as Search} from '../../images/search.svg'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import AuthenticationService from "../../services/AuthenticationService";
import Footer from "../Footer/Footer";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";


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
        },
        loggedUser: ''
    };


    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();
        if (username === '') {
            this.setState({
                title: 'У ВАС ПОКА НЕT ЗАНЯТИЙ'
            })
        } else {
            this.setState({
                title: 'МОИ ЗАНЯТИЯ',
                loggedUser: username    
            })

        }

    }


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
            <div>
                { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="my-lessons" {...this.props}vercel/> :
                    <AuthenticatedHeader  selectedLink="my-lessons" loggedUser={this.state.loggedUser} {...this.props}/>}
                <div className=/*"content-wrap*/ "Home-my-cabinet">{this.state.title}
                    <div className="Lessons">
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
                                    {/*<CheckboxField*/}
                                    {/*    name='onlyMe'*/}
                                    {/*    label='Только я'*/}
                                    {/*    value={onlyMe}*/}
                                    {/*    className='Lessons-FilterField'*/}
                                    {/*    onChange={this.onChangeFilterField}*/}
                                    {/*/>*/}
                                    <Button
                                        className='Lessons-SearchBtn'
                                        onClick={this.onSearch}>
                                        <Search className='Lessons-SearchBtnIcon'/>
                                    </Button>
                                </Form>
                            </div>
                            {isLoading ? (
                                <Loader/>
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
                            ) : ''}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
