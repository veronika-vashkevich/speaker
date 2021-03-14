import React, {Component} from "react";
import "./TeacherCourses.scss"
import AuthenticationService from "../../services/AuthenticationService";
import CourseDataService from "../../services/CourseDataService"
import {withRouter} from "react-router-dom";
import Sidebar from "./Sidebar";
import {createBrowserHistory} from "history";
import TeacherCabinetHeader from "../Teacher/TeacherCabinetHeader";

var thisTemp;
const withRefresh = createBrowserHistory({forceRefresh: true});

function onClick(e, item) {
    console.log("item is ", item);
    thisTemp.setState({
        pptSrc: item.lessonUrl,
        pptUpdateUrl: item.pptUpdateUrl,
        item: item,
        selected: item.lessonId,
        selectedCourse: item.courseId
    });
}


function selectLesson(item) {
    console.log("item is ", item);
    thisTemp.setState({pptSrc: item.lessonUrl, pptUpdateUrl: item.pptUpdateUrl, item: item, selected: item.lessonId});
}

class TeacherCabinet extends Component {


    constructor(props) {
        super(props);
        this.state = {
            teacherCourses: [],
            loggedUser: '',
            pptSrc: '',
            pptUpdateUrl: '',
            selectedCourse: '',
            currentLesson: '',
            item: '',
            selected: '',
            refreshClicked: '',
            key: 0,
            customCollapsed: false
        };
        thisTemp = this;
        this.fetchTeacherCourses = this.fetchTeacherCourses.bind(this);
        this.changeLessonClicked = this.changeLessonClicked.bind(this);
        this.refreshLessonClicked = this.refreshLessonClicked.bind(this);
        this.createLessonClicked = this.createLessonClicked.bind(this);
        this.updateLessonClicked = this.updateLessonClicked.bind(this);
        this.deleteLessonClicked = this.deleteLessonClicked.bind(this);
        this.createCourseClicked = this.createCourseClicked.bind(this);
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
    createCourseClicked(){
        this.redirect("/my-cabinet/create-course")

    }
    createLessonClicked() {
        this.redirect("/my-cabinet/create-lesson")
    }

    updateLessonClicked() {
        this.redirect("/my-cabinet/update-lesson")
    }

    deleteLessonClicked() {
        this.redirect("/my-cabinet/delete-lesson")
    }

    refreshLessonClicked(e) {
        this.setState({key: Math.random()});
        console.log("key", this.state.key);
    }

    redirect(href) {
        if (this.state.item === "" && !(href.substring(12, 25) === "create-course")) {
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

    fetchTeacherCourses() {
        let username = AuthenticationService.getLoggedInUserName();
        CourseDataService.fetchTeacherCourses(username)
            .then(
                response => {
                    this.setState({teacherCourses: response.data});
                }
            );
    }

    componentWillMount() {
        this.fetchTeacherCourses();
        console.log("currentLesson", this.state.pptSrc);
    }

    render() {

        const items_2 = [];
        for (var i = 0; i < this.state.teacherCourses.length; i++) {
            const lessons = [];
            for (var j = 0; j < this.state.teacherCourses[i].lessons.length; j++) {
                lessons.push({
                    name: this.state.teacherCourses[i].lessons[j].title,
                    label: j + 1 + ". " + this.state.teacherCourses[i].lessons[j].title,
                    courseId: this.state.teacherCourses[i].id,
                    courseTitle: this.state.teacherCourses[i].name,
                    lessonId: this.state.teacherCourses[i].lessons[j].id,
                    lessonUrl: this.state.teacherCourses[i].lessons[j].url,
                    pptUpdateUrl: this.state.teacherCourses[i].lessons[j].pptUpdateUrl,
                    expanded: '',
                    onClick
                });
            }

            items_2.push({
                name: this.state.teacherCourses[i].name,
                selector: "course",
                label: this.state.teacherCourses[i].name,
                id: this.state.teacherCourses[i].id,
                collapsedCourse: this.state.teacherCourses[i].id != this.state.selectedCourse,
                items: lessons
            });
            items_2.push("divider");
        }

        return (
            <div>
                <div /*className="teacher-grid-container"*/>
                    <div /*className="grid-item-left-teacher"*/>
                        <TeacherCabinetHeader className="Teacher-Header" selectedCourse="courses"/>
                    </div>
                    <div style={{position: "absolute", right: "5px", display: "inline"}}>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.createCourseClicked}>
                            Создать курс
                        </button>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.changeLessonClicked}>
                            Удалить курс
                        </button>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.changeLessonClicked}>
                            Изменить презентацию
                        </button>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.refreshLessonClicked}>
                            Обновить презентацию
                        </button>
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
                {/*<div className="grid-item-right" style={{paddingTop: "10px"}}>*/}
                {/*    <div className="Teacher-Header">*/}
                {/*        <p> Курс: {this.state.item.courseTitle}</p>*/}
                {/*        <p> Урок: {this.state.item.label}</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="teacher-grid-container" key={this.state.key}>
                    <Sidebar items={items_2} selectedItem={this.state.selected}
                             selectedCourse={this.state.selectedCourse}/>

                    <div>
                        <iframe
                            src={this.state.pptSrc}
                            frameBorder="0"
                            width="820"
                            height="500"
                            allowFullScreen="true"
                            mozallowfullscreen="true"
                            frameBorder="0"
                            webkitallowfullscreen="true"></iframe>
                        <div className="grid-item-right" style={{paddingTop: "10px"}}>
                            <div className="Teacher-Header">
                                <p> Курс: {this.state.item.courseTitle}</p>
                                <p> Урок: {this.state.item.label}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(TeacherCabinet);
