import React, {Component} from 'react'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Course from "../Course/Course"
import '../../components/Header/Header.scss'
import {ReactComponent as Beginner} from "../../images/beginner.svg";
import LessonDataService from "../../services/LessonDataService";
import AuthenticationService from "../../services/AuthenticationService"
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";
import CourseHeader from "../Header/CourseHeader";

const beginner = require('../../images/beginner.svg');
const continuer = require('../../images/continue.svg');
const advanced = require('../../images/advanced.svg');


const COURSES = [
    {className: '', title: '5-7 лет!', href: '/courses', Icon: Beginner},
    {title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course},
    {title: 'Попробуйте наши лучшие курсы!', href: '/courses', Icon: Course},

]
const BEGINNER_DESCRIPTION_OLD = 'Курс состоит из 40 наглядных уроков-презентаций (количество уроков в курсе может изменяться в зависимости от желаемого конечного уровня, возраста и возможностей ребенка). \n' +
    'На каждом занятии ребенок изучает новую лексическую тему (Семья, Животные, Еда, Дом и др.) и проходит базовые грамматические конструкции языка в игровой форме. По желанию в занятия включаются элементы обучения чтению.  По просьбе ребенка или родителей возможно включение дополнительных тем в занятия (например, «Поездка на море»).\n' +
    'Интерактивное домашнее задание не отнимает много времени и не требует постоянного присутствия родителя. \n' +
    'Кому подойдёт: детям 5-12 лет*, которые владеют английским и начинают учить русский язык с нуля. \n' +
    'Занятия: 1-2 раза в неделю, 1 урок – 45-50 мин. \n' +
    '*курс гибкий и может быть адаптирован под детей старшего возраста.\n';

const BEGINNER_DESCRIPTION = BEGINNER_DESCRIPTION_OLD.split('\n').map(i => {
    return <p>{i}</p>
});


const CONTINUE_DESCRIPTION_OLD ='Курс состоит из 40 наглядных уроков-презентаций с добавлением мультимедиа материалов (количество уроков в курсе может изменяться в зависимости от желаемого конечного уровня, возраста и возможностей ребенка).\n' +
    'На каждом занятии ребенок изучает новую лексическую тему и проходит правила из грамматики русского языка в игровой форме. Занятия направлены на развитие разговорной речи и не требуют навыков чтения.\n' +
    'Интерактивное домашнее задание не отнимает много времени и не требует постоянного присутствия родителя. \n' +
    'Кому подойдёт: детям 5-14 лет*, которые владеют русским языком, для дальнейшего развития грамотной устной речи, расширения словарного запаса, устранения грамматических ошибок в речи. \n' +
    'Занятия: 1-2 раза в неделю, 1 урок – 45-50 мин. \n' +
    '*курс гибкий и может быть адаптирован под детей старшего возраста.\n';

const CONTINUE_DESCRIPTION = CONTINUE_DESCRIPTION_OLD.split('\n').map(i => {
    return <p>{i}</p>
});

const ADVANCED_DESCRIPTION_OLD ='Курс состоит из 40 наглядных уроков-презентаций с добавлением мультимедиа материалов (количество уроков в курсе может изменяться в зависимости от желаемого конечного уровня, возраста и возможностей ребенка).\n' +
    'На каждом занятии ребенок изучает новую лексическую тему и проходит правила из грамматики русского языка (выбор правильных окончаний, согласование слов и др.), которые даются в виде наглядных схем и табличек. Занятия направлены на развитие разговорной речи и совершенствования навыков чтения, понимания текста.\n' +
    'Интерактивное домашнее задание не отнимает много времени и не требует постоянного присутствия родителя. \n' +
    'Кому подойдёт: детям 5-14 лет*, которые владеют русским языком, для дальнейшего развития грамотной речи, расширения словарного запаса, устранения грамматических ошибок в речи, улучшения навыков чтения, понимания текстов. \n' +
    'Занятия: 1-2 раза в неделю, 1 урок – 45-50 мин. \n' +
    '*курс гибкий и может быть адаптирован под детей старшего возраста.\n';


const ADVANCED_DESCRIPTION = ADVANCED_DESCRIPTION_OLD.split('\n').map(i => {
    return <p>{i}</p>
});

export default class CoursesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            beginnerLessons: [],
            continueLessons: [],
            advancedLessons: [],
            selectedCourse: 'beginner',
            courseId: 1,
            courseName: "\"НАЧИНАЮЩИЙ\"",
            loggedUser: ''
        };
        this.imageBeginnerClick = this.imageBeginnerClick.bind(this);
        this.imageContinueClick = this.imageContinueClick.bind(this);
        this.imageAdvancedClick = this.imageAdvancedClick.bind(this);
        this.refreshLessons = this.refreshLessons.bind(this);
        this.refreshAllLessons = this.refreshAllLessons.bind(this);
    }

    refreshAllLessons() {
        console.log("executing refreshAllLessons()...");
        this.refreshLessons(1);
        this.refreshLessons(2);
        this.refreshLessons(3);

    }

    refreshLessons(courseId) {
        let username = AuthenticationService.getLoggedInUserName();
        // console.log("username");
        // console.log(username);
        LessonDataService.retrieveAllLessons(username, courseId)
            .then(
                response => {
                    console.log(response);
                    if (courseId === 1) {
                        this.setState({beginnerLessons: response.data});
                        console.log("executing refreshLessons(1)...");
                        console.log("lessons for beginner)...", this.state.beginnerLessons);
                    } else if (courseId === 2) {
                        this.setState({continueLessons: response.data});
                        console.log("executing refreshLessons(2)...");
                        console.log("lessons for continue)...", this.state.continueLessons);
                    } else if (courseId === 3) {
                        this.setState({advancedLessons: response.data});
                        console.log("executing refreshLessons(3)...");
                        console.log("lessons for advanced)...", this.state.advancedLessons);
                    }

                }
            )
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.refreshAllLessons();
        let loggedUser = AuthenticationService.getLoggedInUserName();
        this.setState({
            loggedUser: loggedUser
        });
        console.log('loggedUser', loggedUser );
    }

    imageBeginnerClick() {
        this.setState(
            {
                selectedCourse: 'beginner',
                courseName: "\"НАЧИНАЮЩИЙ\""
            }
        );
        console.log(this.state.selectedCourse);
        console.log(this.state.courseName);
        this.refreshLessons(1);

    }

    imageContinueClick() {
        this.setState(
            {
                selectedCourse: 'continue',
                courseName: "\"ПРОДОЛЖАЮЩИЙ\""
            }
        );
        console.log(this.state.selectedCourse);
        console.log(this.state.courseName);
        this.refreshLessons(2);
    }

    imageAdvancedClick() {
        this.setState(
            {
                selectedCourse: 'advanced',
                courseName: "\"ПРОДВИНУТЫЙ\""
            }
        )

        console.log(this.state.selectedCourse);
        console.log(this.state.courseName);
        this.refreshLessons(3);
    }


    render() {
        return (
            <div className="position-relative">
                { this.state.loggedUser === ''? <NonAuthenticatedHeader selectedLink="courses" {...this.props}/> :
                    <AuthenticatedHeader selectedLink="courses" loggedUser={this.state.loggedUser} {...this.props}/>}
                <div className='Home'>
                    <CourseHeader className="Course-Header" selectedCourse={this.state.selectedCourse}/>
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'beginner' ? 'gallery-courses active' : 'gallery-courses'}`}
                        imgSrc={beginner}
                        desc1="Курс для самых маленьких"
                        desc2="5-7 лет"
                        courseName="'НАЧИНАЮЩИЙ'"
                        selectedCourse="beginner"
                        lessons={this.state.beginnerLessons}
                        description= {BEGINNER_DESCRIPTION}
                        onClicked={this.imageBeginnerClick}
                    />
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'continue' ? 'gallery-courses active' : 'gallery-courses'}`}
                        imgSrc={continuer}
                        desc1="Продолжение курса"
                        desc2="8-12 лет"
                        courseName="'ПРОДОЛЖАЮЩИЙ'"
                        selectedCourse="continue"
                        lessons={this.state.continueLessons}
                        description= {CONTINUE_DESCRIPTION}
                        onClicked={this.imageContinueClick}/>

                    <Course
                        classNameValue={`${this.state.selectedCourse === 'advanced' ? 'gallery-courses active' : 'gallery-courses'}`}
                        imgSrc={advanced}
                        desc1="Продвинутый курс"
                        desc2="13-17 лет"
                        courseName="'ПРОДВИНУТЫЙ'"
                        selectedCourse="advanced"
                        lessons={this.state.advancedLessons}
                        description= {ADVANCED_DESCRIPTION}
                        onClicked={this.imageAdvancedClick}/>
                    <Contact/>
                </div>
                <div style={{position: "relative", margin: " 5% auto", alignItems: "center"}}>
                    <Footer />
                </div>
            </div>

        )
    }
}
