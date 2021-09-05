import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import CourseHeader from "../Header/CourseHeader";

import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import '../Course/CoursesPage.scss'
import LessonDataService from "../../services/LessonDataService";
import Course from "../Course/Course";
import AuthenticationService from "../../services/AuthenticationService";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";


const advanced = require('../../images/advanced.svg');
const ADVANCED_DESCRIPTION_OLD ='•\t 40 наглядных уроков-презентаций с добавлением мультимедиа материалов (количество уроков в курсе может изменяться в зависимости от желаемого конечного уровня, возраста и возможностей ребенка) \n' +
    '•\t на каждом занятии ребенок изучает новую лексическую тему и проходит правила из грамматики русского языка (выбор правильных окончаний, согласование слов и др.), которые даются в виде наглядных схем и таблиц \n' +
    '•\t занятия направлены на развитие разговорной речи и совершенствования навыков чтения, понимания текста \n' +
    '•\t интерактивное домашнее задание не отнимает много времени и не требует постоянного присутствия родителя.  \n' +
    'Кому подойдёт: детям и подросткам 6-16 лет*, которые владеют русским языком, для: \n' +
    '•\t дальнейшего развития грамотной речи и преодоления языкового барьера \n'+
    '•\t расширения словарного запаса \n' +
    '•\t устранения грамматических ошибок в речи \n'+
    '•\t улучшения навыков чтения, понимания текстов. \n'+
    ' Занятия: 1-2 раза в неделю, 1 урок – 50-55 мин. \n'+
    '*курсы гибкие и могут быть адаптированы под детей старшего возраста. В зависимости от интересов студента в урок включаются различные лексические темы.';

const ADVANCED_DESCRIPTION = ADVANCED_DESCRIPTION_OLD.split('\n').map(i => {
    return <p>{i}</p>
});

export default class AdvancedCoursePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            selectedCourse: "advanced",
            courseId: 3,
            courseName: "\"ПРОДВИНУТЫЕ\"",
            loggedUser: ''
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);

        console.log('componentWillMount');
        let username = AuthenticationService.getLoggedInUserName();
        LessonDataService.retrieveAllLessons(username, 3).then(
            response => {
                this.setState({lessons: response.data, loggedUser: username });
                console.log("executing refreshLessons(3)...");
                console.log("lessons for advanced)...", this.state.lessons);
            }
        )
    }

    render() {
        return (
            <div>
                { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="courses" {...this.props}/> :
                    <AuthenticatedHeader  selectedLink="courses" loggedUser={this.state.loggedUser} {...this.props}/>}
                <div className='Home'>
                    <CourseHeader className="Course-Header" selectedCourse={this.state.selectedCourse}/>
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'advanced' ? 'gallery-courses active' : 'gallery'}`}
                        imgSrc={advanced}
                        desc1="Курс ПРОДВИНУТЫЕ"
                        desc2="6-16 лет"
                        courseName="'ПРОДВИНУТЫЕ'"
                        selectedCourse="advanced"
                        lessons={this.state.lessons}
                        description= {ADVANCED_DESCRIPTION}
                    />
                    <Contact />
                </div>
                <div style={{position: "relative", margin: " 5% auto", alignItems: "center"}}>
                    <Footer />
                </div>
            </div>
        )
    }
}
