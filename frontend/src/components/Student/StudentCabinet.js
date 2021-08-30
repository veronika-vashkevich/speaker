import React, {Component} from "react";
import "./StudentCabinet.scss"
import AuthenticationService from "../../services/AuthenticationService";
import CourseDataService from "../../services/CourseDataService"
import {withRouter} from "react-router-dom";
import Sidebar from "../Teacher/Sidebar";
import ls from 'local-storage'
import { createBrowserHistory } from "history";

var thisTemp;
const withRefresh = createBrowserHistory({ forceRefresh: true });

function onClick(e, item) {
    console.log("item is ", item);
    thisTemp.setState({pptSrc: item.lessonUrl, pptUpdateUrl: item.pptUpdateUrl, item: item, selected: item.lessonId, selectedCourse: item.courseId});
}


function selectLesson(item) {
    console.log("item is ", item);
    thisTemp.setState({pptSrc: item.lessonUrl, pptUpdateUrl: item.pptUpdateUrl, item: item, selected: item.lessonId});
}

class StudentCabinet extends Component {


    constructor(props) {
        super(props);
        this.state = {
            StudentCourses: [],
            loggedUser: '',
            pptSrc: '',
            pptUpdateUrl: '',
            selectedCourse: '',
            currentLesson: '',
            item: '',
            selected: '',
            refreshClicked: '',
            key: 0,
            customCollapsed: false,
            authority: '',
            response: ''
        };
        thisTemp = this;
        this.fetchStudentCourses = this.fetchStudentCourses.bind(this);
        this.changeLessonClicked = this.changeLessonClicked.bind(this);
        this.refreshLessonClicked = this.refreshLessonClicked.bind(this);
        this.createLessonClicked = this.createLessonClicked.bind(this);
        this.updateLessonClicked = this.updateLessonClicked.bind(this);
        this.deleteLessonClicked = this.deleteLessonClicked.bind(this);
        this.redirect = this.redirect.bind(this);
    }


    changeLessonClicked() {
        if (this.state.pptUpdateUrl === "") {
            alert("Пожалуйста, сначала выберите урок.")
        } else {
            const url = this.state.pptUpdateUrl;
            window.open(url, '_blank');
        }

    }
    createLessonClicked(){
        this.redirect("/my-cabinet/create-lesson")
    }

    updateLessonClicked(){
        this.redirect("/my-cabinet/update-lesson")
    }

    deleteLessonClicked(){
        this.redirect("/my-cabinet/delete-lesson")
    }

    refreshLessonClicked(e) {
        this.setState({ key: Math.random() });
        console.log("key", this.state.key);
    }

    redirect(href) {
        if (this.state.item === "") {
            alert("Пожалуйста, сначала выберите курс.")
        } else {
            this.props.history.push({
                pathname: href,
                state: {
                    courseId: this.state.item.courseId,
                    courseTitle: this.state.item.courseTitle,
                    lessonId: this.state.item.lessonId,
                    lessonTitle: this.state.item.name,
                }
            });
        }
    }

    fetchStudentCourses() {
        let username = AuthenticationService.getLoggedInUserName();
        AuthenticationService.getUserAuthority(username)
            .then(
                response => {
                    this.setState({authority: response.data});
                }
            );
        console.log("authority", this.state.authority);
        console.log("response", this.state.response);
        this.setState({
            title: 'МОИ ЗАНЯТИЯ',
            loggedUser: username
        })
        console.log("fetching courses for student");
        CourseDataService.fetchCourses(username)
            .then(
                response => {
                    this.setState({StudentCourses: response.data});
                }
            );
    }


    componentWillMount() {
        this.fetchStudentCourses();
        console.log("currentLesson", this.state.pptSrc);
    }



    render() {

        const items_2 = [];
        for (var i = 0; i < this.state.StudentCourses.length; i++) {
            const lessons = [];
            for (var j = 0; j < this.state.StudentCourses[i].lessons.length; j++) {
                lessons.push({
                    name: this.state.StudentCourses[i].lessons[j].title,
                    label: j + 1 + ". " + this.state.StudentCourses[i].lessons[j].title,
                    courseId: this.state.StudentCourses[i].id,
                    courseTitle: this.state.StudentCourses[i].name,
                    lessonId: this.state.StudentCourses[i].lessons[j].id,
                    lessonUrl: this.state.StudentCourses[i].lessons[j].url,
                    pptUpdateUrl: this.state.StudentCourses[i].lessons[j].pptUpdateUrl,
                    expanded:'',
                    onClick
                });
            }

            items_2.push({
                name: this.state.StudentCourses[i].name,
                selector: "course",
                label: this.state.StudentCourses[i].name,
                id: this.state.StudentCourses[i].id,
                collapsedCourse: this.state.StudentCourses[i].id != this.state.selectedCourse,
                items: lessons
            });
            items_2.push("divider");
        }

        return (
            <div>
                <div className="Student-Header">
                    <a className={this.props.selectedLink === 'Student-courses' ? 'active-course-header' : ''} /*href="/Student-courses"*/>Ваши
                        Курсы</a>
                    <p> Курс: {this.state.item.courseTitle}</p>
                    <p> Урок: {this.state.item.label}</p>
                    <div style={{position: "absolute", right: "30px", display: "inline"}}>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.updateLessonClicked}>
                            Изменить название урока
                        </button>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.createLessonClicked}>
                            Создать урок
                        </button>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.deleteLessonClicked}>
                            Удалить урок
                        </button>
                    </div>
                </div>
                <div className="Student-grid-container" key={this.state.key}>
                    <Sidebar items={items_2} selectedItem={this.state.selected} selectedCourse={this.state.selectedCourse} />

                    <div>
                        <iframe
                            src={this.state.pptSrc}
                            frameBorder="0"
                            width="960"
                            height="569"
                            allowFullScreen="true"
                            mozallowfullscreen="true"
                            frameBorder="0"
                            webkitallowfullscreen="true"></iframe>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(StudentCabinet);
