import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Footer from "../Footer/Footer";
import AuthenticationService from "../../services/AuthenticationService";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";
import CourseDataService from "../../services/CourseDataService";
import TeacherCabinetHeader from "../Teacher/TeacherCabinetHeader";


let startIndex = 0;

export default class CreateCoursePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedUser: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            stateName: '',
            courseTitle: '',
            courseDescription: '',
            numberOfLessons: ''


        };
        this.goBackCLicked = this.goBackCLicked.bind(this);
        this.redirect = this.redirect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createCourseClicked = this.createCourseClicked.bind(this);
    }

    handleChange(event) {
        // console.log("event.target.name = ", event.target.name);
        // console.log("event.target.value = ", event.target.value);

        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }


    createCourseClicked() {
        if (this.state.courseTitle === '') {
            alert("Пожалуйста, введите название курса перед созданием!")
        }
        CourseDataService
            .createCourse(this.state.courseTitle, this.state.courseDescription, this.state.numberOfLessons)
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


    componentWillMount() {
        startIndex = 0;
        let user = AuthenticationService.getLoggedInUserName();
        this.setState({
            loggedUser: user
        });
    }


    goBackCLicked() {
        this.redirect("/my-cabinet")
    }


    render() {
        return (
            <div>
                {AuthenticationService.getLoggedInUserName() === '' ?
                    <NonAuthenticatedHeader selectedLink="my-cabinet" {...this.props}/> :
                    <AuthenticatedHeader selectedLink="my-cabinet" loggedUser={this.state.loggedUser} {...this.props}/>}

                <div /*className="grid-item-left-teacher"*/>
                    <TeacherCabinetHeader className="Teacher-Header" selectedCourse="courses"/>
                </div>
                <div style={{marginTop: "10px"}} className="grid-container">
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}

                    {/*Название курса:*/}
                    <div className="grid-item-left">
                        Название курса:
                    </div>
                    <div className="grid-item-right">
                        <input type="text" name="courseTitle"
                               onChange={this.handleChange}/>
                    </div>

                    {/*Название курса:*/}
                    <div className="grid-item-left">
                        Краткое описание курса:
                    </div>
                    <div className="grid-item-right">
                        <input type="text" name="courseDescription"  placeholder="необязательное поле"
                               onChange={this.handleChange}/>
                    </div>

                    {/*Количество уроков:*/}
                    <div className="grid-item-left">
                        Количество уроков:
                    </div>
                    <div className="grid-item-right">
                        <input type="text" name="numberOfLessons"  placeholder="40"
                               onChange={this.handleChange}/>
                    </div>

                </div>
                <div style={{marginTop: "10px"}}>
                    <button className='Header-ExitBtn btn btn-primary bold' onClick={this.createCourseClicked}>
                        Создать курс
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

