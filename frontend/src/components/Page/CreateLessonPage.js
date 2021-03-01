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
            item: '',
            stateName: '',
            selectedCourse: '',
            lessonNumber: '',
            lessonTitle: ''

        };
        this.fetchTeacherCourses = this.fetchTeacherCourses.bind(this);
        this.calculateNumberOfLessons = this.calculateNumberOfLessons.bind(this);
        this.goBackCLicked = this.goBackCLicked.bind(this);
        this.redirect = this.redirect.bind(this);
        this.handleLessonTitleChange = this.handleLessonTitleChange.bind(this);
        this.createLessonClicked = this.createLessonClicked.bind(this);
    }

    handleLessonTitleChange(event) {
    this.setState(
        {
            [event.target.name]: event.target.value
        }
    )
    }


    createLessonClicked() {
        console.log("createLessonClicked() ...");
        console.log("lesson title is ", this.state.lessonTitle)
        if(this.state.lessonTitle === ''){
            alert("Пожалуйста, введите название урока перед созданием!")
        }
        LessonDataService
            .createLesson(this.state.selectedCourse, this.state.lessonNumber, this.state.lessonTitle)
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

    redirect(href) {
        this.props.history.push({
            pathname: href,
            state: {stateName: "test"}
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
                            lessonNumber: this.state.teacherCourses[0].lessons.length + 1
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
                            Выберите курс :
                        </label>
                    </div>
                    <div className="grid-item-right">
                        <select value={this.state.value} onChange={this.handleChange}>
                            {optionTemplate}
                        </select>
                    </div>
                    <div className="grid-item-left">
                        Номер урока:
                    </div>
                    <div className="grid-item-right">
                        {this.state.lessonNumber}
                    </div>
                    <div className="grid-item-left">
                        Название урока:
                    </div>
                    <div className="grid-item-right">
                        <input type="text" /*placeholder="lesson title"*/ name="lessonTitle"
                            // value={this.state.email}
                               onChange={this.handleLessonTitleChange}/>
                    </div>
                </div>
                <div  style={{marginTop: "10px"}}>
                    <button className='Header-ExitBtn btn btn-primary bold' onClick={this.createLessonClicked}>
                        Создать урок
                    </button>
                    <button className='Header-ExitBtn btn btn-primary bold' onClick={this.goBackCLicked}>
                        Вернуться к курсам
                    </button>
                </div>
                <Footer/>
            </div>
        )
    }
}

