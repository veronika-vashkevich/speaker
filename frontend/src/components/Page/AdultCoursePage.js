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


const adult = require('../../images/adult.svg');
const ADULT_DESCRIPTION_OLD = '•\t 40 наглядных уроков-презентаций (количество уроков в курсе может изменяться в зависимости от желаемого конечного уровня, возраста и возможностей студента)  \n' +
    '•\t на каждом занятии изучается новая лексическая тема (общение в различных ситуациях: «Кафе», «В городе», «В отпуске») и базовые грамматические конструкции языка \n' +
    '•\t параллельно происходит обучение правилам чтения и произношения \n' +
    '•\t возможно включение дополнительных тем в занятия по желанию студента\n' +
    '•\t интерактивное домашнее задание помогает повторить и закрепить материал с занятия и занимает буквально 10-20 минут  \n' +
    'Кому подойдёт: подросткам и взрослым от 13 лет*, которые владеют английским и начинают учить русский язык с нуля.  \n' +
    ' Занятия: 1-2 раза в неделю, 1 урок – 50-55 мин \n' +
    '*курсы гибкие и могут быть адаптированы под детей старшего возраста. В зависимости от интересов студента в урок включаются различные лексические темы.';

const ADULT_DESCRIPTION = ADULT_DESCRIPTION_OLD.split('\n').map(i => {
    return <p>{i}</p>
});

export default class AdvancedCoursePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            selectedCourse: "adult",
            courseId: 4,
            courseName: "ВЗРОСЛЫЕ",
            loggedUser: ''
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);

        console.log('componentWillMount');
        let username = AuthenticationService.getLoggedInUserName();
        LessonDataService.retrieveAllLessons(username, 4).then(
            response => {
                this.setState({lessons: response.data, loggedUser: username});
                console.log("executing refreshLessons(4)...");
                console.log("lessons for advanced)...", this.state.lessons);
            }
        )
    }

    render() {
        return (
            <div>
                {AuthenticationService.getLoggedInUserName() === '' ?
                    <NonAuthenticatedHeader selectedLink="courses" {...this.props}/> :
                    <AuthenticatedHeader selectedLink="courses" loggedUser={this.state.loggedUser} {...this.props}/>}
                <div className='Home'>
                    <CourseHeader className="Course-Header" selectedCourse={this.state.selectedCourse}/>
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'adult' ? 'gallery-courses active' : 'gallery'}`}
                        imgSrc={adult}
                        desc1="Курс ВЗРОСЛЫЕ"
                        desc2="от 13 лет"
                        courseName="'ВЗРОСЛЫЕ'"
                        selectedCourse="adult"
                        lessons={this.state.lessons}
                        description={ADULT_DESCRIPTION}
                    />
                </div>
               <div style={{position: "relative", margin: " 5% auto", alignItems: "center"}}>
                    <Footer/>
                </div>
            </div>
        )
    }
}
