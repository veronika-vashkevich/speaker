import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Footer from "../Footer/Footer";
import AuthenticationService from "../../services/AuthenticationService";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";
import CourseDataService from "../../services/CourseDataService";
import LessonDataService from "../../services/LessonDataService";


let startIndex = 0;

export default class CreateLessonPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedUser: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            teacherCourses: [],
            item: this.props.location.state.item,
            courseId: this.props.location.state.courseId,
            courseTitle:  this.props.location.state.courseTitle,
            lessonId: this.props.location.state.lessonId,
            lessonTitle: this.props.location.state.lessonTitle

        };
        this.fetchTeacherCourses = this.fetchTeacherCourses.bind(this);
        this.calculateNumberOfLessons = this.calculateNumberOfLessons.bind(this);
        this.goBackCLicked = this.goBackCLicked.bind(this);
        this.redirect = this.redirect.bind(this);
        this.handleLessonTitleChange = this.handleLessonTitleChange.bind(this);
        this.deleteLessonClicked = this.deleteLessonClicked.bind(this);

    }



    handleLessonTitleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }


    deleteLessonClicked() {
        if (this.state.lessonId === "") {
            alert("Пожалуйста, сначала выберите урок.")
        } else {

            LessonDataService
                .deleteLesson( this.state.lessonId)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("response", response);
                        this.setState({hasLoginFailed: false});
                    }
                    this.props.history.push(`/my-cabinet`)
                }).catch(() => {
                this.setState({showSuccessMessage: false});
                this.setState({hasLoginFailed: true});
                console.log("error");
            })
        }
    }

    redirect(href) {
        this.props.history.push({
            pathname: href
        });
    }

    fetchTeacherCourses() {
        console.log("fetchTeacherCourses()...");
        let username = AuthenticationService.getLoggedInUserName();
        CourseDataService.fetchTeacherCourses(username)
            .then(
                response => {

                    this.setState({
                        teacherCourses: response.data
                    });
                    if (startIndex === 0) {
                        this.setState({
                            selectedCourse: this.state.teacherCourses[0].id,
                            lessonNumber: this.state.teacherCourses[0].lessons.length
                        });
                        startIndex++;
                    }

                }
            );
    }

    calculateNumberOfLessons(event) {

        for (let i = 0; i < this.state.teacherCourses.length; i++) {

            if (this.state.teacherCourses[i].id == event.target.value) {
                this.setState({
                    lessonNumber: this.state.teacherCourses[i].lessons.length + 1
                });
            }
        }
    }

    componentWillMount() {
        startIndex = 0;
        let user = AuthenticationService.getLoggedInUserName();
        console.log("startIndex", startIndex);
        console.log("courseId = ", this.state.courseId);
        console.log("courseTitle = ", this.state.courseTitle);
        console.log("lessonId = ", this.state.lessonId);
        console.log("lessonTitle = ", this.state.lessonTitle);
        this.fetchTeacherCourses();
        this.setState({
            loggedUser: user
        });
    }

    handleChange = (event) => {
        this.calculateNumberOfLessons(event);
    };

    goBackCLicked() {
        this.redirect("/my-cabinet")
    }


    render() {
        let optionTemplate = this.state.teacherCourses.map(v => (
            <option style={{paddingLeft: "30px"}} value={v.id}>{v.name}</option>
        ));

        return (
            <div>
                {AuthenticationService.getLoggedInUserName() === '' ?
                    <NonAuthenticatedHeader selectedLink="my-cabinet" {...this.props}/> :
                    <AuthenticatedHeader selectedLink="my-cabinet" loggedUser={this.state.loggedUser} {...this.props}/>}
                <div style={{marginTop: "10px"}} className="grid-container">
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    <div className="grid-item-left">
                        <label>
                            Курс :
                        </label>
                    </div>
                        <div className="grid-item-right">
                            {this.state.courseTitle}
                        </div>
                    <div className="grid-item-left">
                        Урок:
                    </div>
                    <div className="grid-item-right">
                        {this.state.lessonTitle}
                    </div>
                </div>
                <div  style={{marginTop: "10px"}}>
                    <button className='Header-ExitBtn btn btn-primary bold' onClick={this.deleteLessonClicked}>
                        Удалить урок
                    </button>
                    <button className='Header-ExitBtn btn btn-primary bold' onClick={this.goBackCLicked}>
                        Вернуться к урокам
                    </button>
                </div>
                <Footer/>
            </div>
        )
    }
}

