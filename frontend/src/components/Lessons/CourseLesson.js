import React, {Component} from 'react';
import moment from 'moment'
import './CourseLesson.scss'
import LessonDataService from '../../services/LessonDataService'

export default class CourseLesson extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            lessons: [],
        }
        this.props ={
            courseName: '',
            selectedCourse: '',
            message: null
        }
        // this.deletelessonClicked = this.deletelessonClicked.bind(this)
        // this.updatelessonClicked = this.updatelessonClicked.bind(this)
        // this.addlessonClicked = this.addlessonClicked.bind(this)
        // this.startlessonClicked = this.startlessonClicked.bind(this)
        // this.refreshLessons = this.refreshLessons.bind(this)
    }

    // componentWillUnmount() {
    //     console.log('componentWillUnmount')
    // }
    //
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldComponentUpdate')
    //     console.log(nextProps)
    //     console.log(nextState)
    //     return true
    // }
    //
    // componentDidMount() {
    //     console.log('componentDidMount')
    //     this.refreshLessons();
    //     console.log(this.state)
    // }
    //
    // startlessonClicked(id){
    //     let username = AuthenticationService.getLoggedInUserName()
    //     lessonDataService.startlesson(username)
    // }
    // refreshLessons() {
    //     // let username = AuthenticationService.getLoggedInUserName()
    //     LessonDataService.retrieveAllLessons()
    //         .then(
    //             response => {
    //                 //console.log(response);
    //                 this.setState({ lessons: response.data })
    //             }
    //         )
    // }

    // deletelessonClicked(id) {
    //     let username = AuthenticationService.getLoggedInUserName()
    //     //console.log(id + " " + username);
    //     lessonDataService.deletelesson(username, id)
    //         .then(
    //             response => {
    //                 this.setState({ message: `Delete of lesson ${id} Successful` })
    //                 this.refreshlessons()
    //             }
    //         )
    //
    // }
    //
    // addlessonClicked() {
    //     this.props.history.push(`/lessons/-1`)
    // }
    //
    // updatelessonClicked(id) {
    //     console.log('update ' + id)
    //     this.props.history.push(`/lessons/${id}`)
    // }

    render() {
        console.log('render');
        return (
            <div>
                <h1>Программа курса {this.props.courseName}</h1>
                
                {this.props.message && <div class="alert alert-success">{this.props.message}</div>}
                {/*<div className="container">*/}
                <div className="scroll-pane">
                    <table className="table" cellspacing="20">
                        <thead>
                        <tr>
                            <th>Номер урока</th>
                            <th>Тема</th>
                            <th>По окончании урока ребенок сможет</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.lessons.map(
                                lesson =>
                                    <tr key={lesson.lesson_id}>
                                        <td>{lesson.lesson_id}</td>
                                        <td>{lesson.topic}</td>
                                        <td>{lesson.endOfLesson}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


