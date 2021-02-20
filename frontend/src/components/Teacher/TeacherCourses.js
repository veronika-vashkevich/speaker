import React, {Component}  from "react";
import "./TeacherCourses.scss"
import AuthenticationService from "../../services/AuthenticationService";
import CourseDataService from "../../services/CourseDataService"
import {BrowserRouter as Router, Route, Switch, useHistory, Redirect} from "react-router-dom";
import { withRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

var thisTemp;

function onClick(e, item) {
    console.log("item is ", item);
    thisTemp.setState({pptSrc: item.lessonUrl, pptUpdateUrl: item.pptUpdateUrl, item: item, selected: item.lessonId});
    localStorage.setItem('pptSrc', item.lessonUrl);
}

class TeacherCourses extends Component {


    constructor(props) {
        super(props);
        this.state = {
            teacherCourses: [],
            loggedUser: '',
            pptSrc: '',
            pptUpdateUrl: '',
            currentCourse: '',
            currentLesson: '',
            item: '',
            selected: '',
            refreshClicked: ''
        };
        thisTemp = this;
        this.fetchTeacherCourses = this.fetchTeacherCourses.bind(this);
        this.changeLessonClicked = this.changeLessonClicked.bind(this);
        this.refreshLessonClicked = this.refreshLessonClicked.bind(this);
        this.createLessonClicked = this.createLessonClicked.bind(this);
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


    refreshLessonClicked(e) {
        this.setState({pptSrc: this.state.pptSrc + 1});

    }

    redirect(href) {
        // return <Redirect to={{
        //     pathname: href,
        //     state: { stateName: "test"}
        // }} />;
       // let history = useHistory();
        // console.log("this is redirect");
        // console.log("selectedCourse is ", selectedCourse);
        // console.log("courseId is ", courseId);
        this.props.history.push({
            pathname: href,
            state: { stateName: "test"}
        });
    }

    createLessonClicked(){
        console.log("createLessonClicked()");
        this.redirect("/my-cabinet/create-lesson")
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
        localStorage.setItem("item", this.state.item);
        console.log("item after refresh  ", localStorage.getItem("item"));
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
                    onClick
                });
            }
            // console.log("lessons", lessons);


            items_2.push({
                name: this.state.teacherCourses[i].name,
                selector: "course",
                label: this.state.teacherCourses[i].name,
                id: this.state.teacherCourses[i].id,
                items: lessons
            });
            items_2.push("divider");
        }

        return (
            <div>
                <div className="Teacher-Header">
                    <a className={this.props.selectedLink === 'teacher-courses' ? 'active-course-header' : ''} /*href="/teacher-courses"*/>Ваши
                        Курсы</a>
                    <p> Курс: {this.state.item.courseTitle}</p>
                    <p> Урок: {this.state.item.label}</p>
                    <div style={{position: "absolute", right: "30px", display: "inline"}}>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.changeLessonClicked}>
                            Изменить презентацию
                        </button>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.changeLessonClicked}>
                            Изменить название урока
                        </button>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.refreshLessonClicked}>
                            Обновить изменения
                        </button>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.createLessonClicked}>
                            Создать урок
                        </button>
                        <button className='Header-ExitBtn btn btn-primary bold' onClick={this.changeLessonClicked}>
                            Удалить урок
                        </button>
                    </div>
                </div>
                <div className="teacher-grid-container">
                    <Sidebar items={items_2} selectedItem={this.state.selected}/>

                    <div>
                        <iframe
                            src={this.state.pptSrc}
                            frameBorder="0" width="628" height="500" allowFullScreen={true} mozallowfullscreen="true"
                            // marginTop="20px"
                            frameBorder="0"
                            webkitallowfullscreen="true"></iframe>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TeacherCourses);
