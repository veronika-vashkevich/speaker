import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Footer from "../Footer/Footer";
import AuthenticationService from "../../services/AuthenticationService";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";
import CourseDataService from "../../services/CourseDataService";


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
            lessonNumber: ''

        };
        this.fetchTeacherCourses = this.fetchTeacherCourses.bind(this);
        this.calculateNumberOfLessons = this.calculateNumberOfLessons.bind(this);
        this.goBackCLicked = this.goBackCLicked.bind(this);
        this.redirect = this.redirect.bind(this);
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

    goBackCLicked(){
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
                <label>
                    Выберите курс :
                    <select value={this.state.value} onChange={this.handleChange}>
                        {optionTemplate}
                    </select>
                </label>
                <div>
                    Lessons ordinal: {this.state.lessonNumber}
                </div>
                <div style={{display: "grid"}} className="grid-container">
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}

                    <div className="grid-item-left">
                        Название урока:
                    </div>
                    <div className="grid-item-right">
                        <input type="text" placeholder="lesson title" name="lessonTitle"
                            // value={this.state.email}
                               onChange={this.handleChange}/>
                    </div>

                </div>
                <button className='Header-ExitBtn btn btn-primary bold' onClick={this.changeLessonClicked}>
                    Создать урок
                </button>
                <button className='Header-ExitBtn btn btn-primary bold' onClick={this.goBackCLicked}>
                    Go back to courses
                </button>
                <Footer/>
            </div>
        )
    }
}

