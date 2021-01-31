import React, {Component} from "react";
import "./TeacherCourses.scss"
import AuthenticationService from "../../services/AuthenticationService";
import CourseDataService from "../../services/CourseDataService"
import Sidebar from "./Sidebar";
import TeacherHeader from "../Header/TeacherHeader";

var thisTemp;

function onClick(e, item) {
    console.log("item is ", item)

            thisTemp.setState({pptSrc: item.lessonUrl});

        console.log("label is ", item.label)
}

export default class TeacherCourses extends Component {


    constructor(props) {
        super(props);
        this.state = {
            teacherCourses: [],
            loggedUser: '',
            pptSrc: '',
            currentCourse:'',
            currentLesson: ''
        };
        thisTemp = this;
        // this.alertClicked = this.alertClicked.bind(this);
        this.fetchTeacherCourses = this.fetchTeacherCourses.bind(this);
        // this.onClick = this.onClick.bind(this);
    }




    // alertClicked() {
    //     this.setState({pptSrc:  "https://docs.google.com/presentation/d/e/2PACX-1vSgC2ITIrhDIBjLMk3T1i_SJheunrzOlkPEmFsap93o8ghwVLGZNW1OjRXBci8pHQ/embed?start=false&loop=false&delayms=3000"});
    //     console.log(this.state.pptSrc);
    // }

    fetchTeacherCourses() {
        console.log("executing fetchTeacherAllLessons()...");
        let username = AuthenticationService.getLoggedInUserName();
        CourseDataService.fetchTeacherCourses(username)
            .then(
                response => {
                    console.log(response);

                    this.setState({teacherCourses: response.data});
                }
            );
    }

    componentWillMount() {
        this.fetchTeacherCourses();
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
                    lessonId: this.state.teacherCourses[i].lessons[j].id,
                    lessonUrl: this.state.teacherCourses[i].lessons[j].url,
                    onClick
                });
            }
            console.log("lessons", lessons);


            items_2.push({
                name: this.state.teacherCourses[i].name, label: this.state.teacherCourses[i].name,
                items: lessons
            });
            items_2.push("divider");
        }

        return (
            <div>
                <TeacherHeader selectedLink="teacher-courses"/>
                <div className="teacher-grid-container">
                    <Sidebar items={items_2}/>
                    <div>
                        <iframe
                            src={this.state.pptSrc}
                            frameBorder="0" width="628" height="500" allowFullScreen="true" mozallowfullscreen="true"
                            // marginTop="20px"
                            frameBorder="0"
                            webkitallowfullscreen="true"></iframe>
                    </div>
                </div>
            </div>
        )
    }
}
