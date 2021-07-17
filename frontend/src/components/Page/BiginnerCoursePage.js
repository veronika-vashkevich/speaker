import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";

import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import LessonDataService from "../../services/LessonDataService";
import Course from "../Course/Course";
import AuthenticationService from "../../services/AuthenticationService";
import CourseHeader from "../Header/CourseHeader";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";


const beginner = require('../../images/beginner.svg');
const BEGINNER_DESCRIPTION_OLD = 'Курс состоит из 40 наглядных уроков-презентаций (количество уроков в курсе может изменяться в зависимости от желаемого конечного уровня, возраста и возможностей ребенка). \n' +
    'На каждом занятии ребенок изучает новую лексическую тему (Семья, Животные, Еда, Дом и др.) и проходит базовые грамматические конструкции языка в игровой форме. По желанию в занятия включаются элементы обучения чтению.  По просьбе ребенка или родителей возможно включение дополнительных тем в занятия (например, «Поездка на море»).\n' +
    'Интерактивное домашнее задание не отнимает много времени и не требует постоянного присутствия родителя. \n' +
    'Кому подойдёт: детям 5-12 лет*, которые владеют английским и начинают учить русский язык с нуля. \n' +
    'Занятия: 1-2 раза в неделю, 1 урок – 45-50 мин. \n' +
    '*курс гибкий и может быть адаптирован под детей старшего возраста.\n';


const BEGINNER_DESCRIPTION = BEGINNER_DESCRIPTION_OLD.split('\n').map(i => {
    return <p>{i}</p>
});


export default class BeginnerCoursePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            selectedCourse: "beginner",
            courseId: 1,
            courseName: "\"НАЧИНАЮЩИЙ\"",
            loggedUser: ''
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        console.log('componentWillMount');
        let username = AuthenticationService.getLoggedInUserName();
        LessonDataService.retrieveAllLessons(username, 1) .then(
            response => {
                this.setState({lessons: response.data});
                console.log("executing refreshLessons(1)...");
                console.log("lessons for beginner)...", this.state.lessons);
            }
        );
        this.setState({
            loggedUser: username
        });
    }

        render() {
            return (
                <div>
                    { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="courses" {...this.props}/> :
                        <AuthenticatedHeader  selectedLink="courses" loggedUser={this.state.loggedUser} {...this.props}/>}

                    <div className='Home'>
                        <CourseHeader className="Course-Header" selectedCourse={this.state.selectedCourse}/>
                        <Course
                            classNameValue={`${this.state.selectedCourse === 'beginner' ? 'gallery-courses active' : 'gallery'}`}
                            imgSrc={beginner}
                            desc1="Курс для самых маленьких"
                            desc2="5-7 лет"
                            courseName="'НАЧИНАЮЩИЙ'"
                            selectedCourse="beginner"
                            lessons={this.state.lessons}
                            description= {BEGINNER_DESCRIPTION}
                            // onClicked={this.imageBeginnerClick}
                        />
                        <Contact/>
                    </div>
                    <div style={{position: "relative", margin: " 5% auto", alignItems: "center"}}>
                        <Footer />
                    </div>
                </div>
            )
        }
}
