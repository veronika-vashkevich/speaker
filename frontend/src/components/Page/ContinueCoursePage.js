import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";

import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import LessonDataService from "../../services/LessonDataService";
import Course from "../Course/Course";
import AuthenticationService from "../../services/AuthenticationService";
import CourseHeader from "../Header/CourseHeader";
import '../../components/Home/Home.scss'
import "../Course/CoursesPage.scss"
import AuthenticatedHeader from "../Header/AuthenticatedHeader";


const continuer = require('../../images/continue.svg');

const CONTINUE_DESCRIPTION_OLD ='•\t40 наглядных уроков-презентаций с добавлением мультимедиа материалов (количество уроков в курсе может изменяться в зависимости от желаемого конечного уровня, возраста и возможностей ребенка)\n' +
    '•\t на каждом занятии ребенок изучает новую лексическую тему и проходит правила из грамматики русского языка в игровой форме\n' +
    '•\t занятия направлены на развитие разговорной речи и не требуют навыков чтения \n' +
    '•\t интерактивное домашнее задание не отнимает много времени и не требует постоянного присутствия родителя.  \n' +
    'Кому подойдёт: детям и подросткам 6-16 лет*, которые владеют русским языком, для: \n' +
    '•\t дальнейшего развития грамотной устной речи и преодоления языкового барьера \n'+
    '•\t расширения словарного запаса \n' +
    '•\t устранения грамматических ошибок в речи. \n'+
    'Занятия: 1-2 раза в неделю, 1 урок – 50-55 мин. \n'+
    '*курсы гибкие и могут быть адаптированы под детей старшего возраста. В зависимости от интересов студента в урок включаются различные лексические темы.';

const CONTINUE_DESCRIPTION = CONTINUE_DESCRIPTION_OLD.split('\n').map(i => {
    return <p>{i}</p>
});

export default class BeginnerCoursePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            selectedCourse: "continue",
            courseId: 2,
            courseName: "\"ПРОДОЛЖАЮЩИЕ\"",
            loggedUser: ''
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        console.log('componentWillMount');
        let username = AuthenticationService.getLoggedInUserName();
        LessonDataService.retrieveAllLessons(username, 2) .then(
            response => {
                this.setState({lessons: response.data, loggedUser: username });
                console.log("executing refreshLessons(2)...");
                console.log("lessons for continue)...", this.state.lessons);
            }
        )
    }

    render() {
        return (
            <div>
                {/*<NonAuthenticatedHeader  selectedLink="courses"  {...this.props}/>*/}
                { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="courses" {...this.props}/> :
                    <AuthenticatedHeader  selectedLink="courses" loggedUser={this.state.loggedUser} {...this.props}/>}

                <div className='Home' >
                    <CourseHeader className="Course-Header" selectedCourse={this.state.selectedCourse}/>
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'continue' ? 'gallery-courses active' : 'gallery'}`}
                        imgSrc={continuer}
                        desc1="Курс ПРОДОЛЖАЮЩИЕ "
                        desc2="6-16 лет"
                        courseName="'ПРОДОЛЖАЮЩИЕ'"
                        selectedCourse="continue"
                        lessons={this.state.lessons}
                        description={CONTINUE_DESCRIPTION}
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
