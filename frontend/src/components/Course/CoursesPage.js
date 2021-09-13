import React, {Component} from 'react'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Course from "../Course/Course"
import '../../components/Header/Header.scss'
import LessonDataService from "../../services/LessonDataService";
import AuthenticationService from "../../services/AuthenticationService"
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";
import CourseHeader from "../Header/CourseHeader";

const beginner = require('../../images/beginner.svg');
const continuer = require('../../images/continue.svg');
const advanced = require('../../images/advanced.svg');
const adult = require('../../images/adult.svg');


const BEGINNER_DESCRIPTION_OLD = '•\t 40 наглядных уроков-презентаций (количество уроков в курсе может изменяться в зависимости от желаемого конечного уровня, возраста и возможностей ребенка)  \n' +
    '•\t	на каждом занятии ребенок изучает новую лексическую тему (Семья, Животные, Еда, Дом и др.) и проходит базовые грамматические конструкции языка в игровой форме \n' +
    '•\t обучение правилам чтения и произношения \n' +
    '•\t возможно включение дополнительных тем в занятия (например, «Поездка на море»).\n' +
    '•\t интерактивное домашнее задание не отнимает много времени и не требует постоянного присутствия родителя.  \n' +
    'Кому подойдёт: детям 6-13 лет*, которые владеют английским и начинают учить русский язык с нуля.\n' +
    'Занятия: 1-2 раза в неделю, 1 урок – 50-55 мин.\n' +
    '*курсы гибкие и могут быть адаптированы под детей старшего возраста. В зависимости от интересов студента в урок включаются различные лексические темы.';

const BEGINNER_DESCRIPTION = BEGINNER_DESCRIPTION_OLD.split('\n').map(i => {
    return <p>{i}</p>
});


const CONTINUE_DESCRIPTION_OLD ='•\t40 наглядных уроков-презентаций с добавлением мультимедиа материалов (количество уроков в курсе может изменяться в зависимости от желаемого конечного уровня, возраста и возможностей ребенка)\n' +
    '•\t на каждом занятии ребенок изучает новую лексическую тему и проходит правила из грамматики русского языка в игровой форме\n' +
    '•\t занятия направлены на развитие разговорной речи и не требуют навыков чтения \n' +
    '•\t интерактивное домашнее задание не отнимает много времени и не требует постоянного присутствия родителя.  \n' +
    'Кому подойдёт: детям и подросткам 6-16 лет*, которые владеют русским языком, для: \n' +
    '•\t дальнейшего развития грамотной устной речи и преодоления языкового барьера \n'+
    '•\t расширения словарного запаса \n' +
    '•\t устранения грамматических ошибок в речи. \n'+
    'Занятия: 1-2 раза в неделю, 1 урок – 50-55 мин. \n'+
    '*курс гибкий и может быть адаптирован под детей старшего возраста.\n' +
    '*курсы гибкие и могут быть адаптированы под детей старшего возраста. В зависимости от интересов студента в урок включаются различные лексические темы.';

const CONTINUE_DESCRIPTION = CONTINUE_DESCRIPTION_OLD.split('\n').map(i => {
    return <p>{i}</p>
});

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

export default class CoursesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            beginnerLessons: [],
            continueLessons: [],
            advancedLessons: [],
            selectedCourse: 'beginner',
            courseId: 1,
            courseName: "\"НАЧИНАЮЩИЕ\"",
            loggedUser: ''
        };
        this.imageBeginnerClick = this.imageBeginnerClick.bind(this);
        this.imageContinueClick = this.imageContinueClick.bind(this);
        this.imageAdvancedClick = this.imageAdvancedClick.bind(this);
        this.imageAdultClick = this.imageAdultClick.bind(this);
        //this.refreshLessons = this.refreshLessons.bind(this);
      //  this.refreshAllLessons = this.refreshAllLessons.bind(this);
    }

    //refreshAllLessons() {
        //console.log("executing refreshAllLessons()...");
        // this.refreshLessons(1);
        // this.refreshLessons(2);
        // this.refreshLessons(3);
        // this.refreshLessons(4);

    //}

    // refreshLessons(courseId) {
    //     let username = AuthenticationService.getLoggedInUserName();
    //     // console.log("username");
    //     // console.log(username);
    //     LessonDataService.retrieveAllLessons(username, courseId)
    //         .then(
    //             response => {
    //                 console.log(response);
    //                 if (courseId === 1) {
    //                     this.setState({beginnerLessons: response.data});
    //                     console.log("executing refreshLessons(1)...");
    //                     console.log("lessons for beginner)...", this.state.beginnerLessons);
    //                 } else if (courseId === 2) {
    //                     this.setState({continueLessons: response.data});
    //                     console.log("executing refreshLessons(2)...");
    //                     console.log("lessons for continue)...", this.state.continueLessons);
    //                 } else if (courseId === 3) {
    //                     this.setState({advancedLessons: response.data});
    //                     console.log("executing refreshLessons(3)...");
    //                     console.log("lessons for advanced)...", this.state.advancedLessons);
    //                 }else if (courseId === 4) {
    //                     this.setState({adultLessons: response.data});
    //                     console.log("executing refreshLessons(4)...");
    //                     console.log("lessons for advanced)...", this.state.advancedLessons);
    //                 }
    //
    //             }
    //         )
    // }

    componentWillMount() {
       // this.refreshAllLessons();
        let loggedUser = AuthenticationService.getLoggedInUserName();
        this.setState({
            loggedUser: loggedUser
        });
    }

    imageBeginnerClick() {
        this.setState(
            {
                selectedCourse: 'beginner',
                courseName: "\"НАЧИНАЮЩИЕ\""
            }
        );
       // this.refreshLessons(1);

    }

    imageContinueClick() {
        this.setState(
            {
                selectedCourse: 'continue',
                courseName: "\"ПРОДОЛЖАЮЩИЕ\""
            }
        );
      //  this.refreshLessons(2);
    }

    imageAdvancedClick() {
        this.setState(
            {
                selectedCourse: 'advanced',
                courseName: "\"ПРОДВИНУТЫЕ\""
            }
        );
        //this.refreshLessons(3);
    }

    imageAdultClick() {
        this.setState(
            {
                selectedCourse: 'adult',
                courseName: "\"ВЗРОСЛЫЕ\""
            }
        );
        //this.refreshLessons(3);
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
                        desc1="Курс НАЧИНАЮЩИЕ (дети) "
                        desc2="6-13 лет"
                        courseName="'НАЧИНАЮЩИЕ'"
                        selectedCourse="beginner"
                        lessons={this.state.lessons}
                        description= {BEGINNER_DESCRIPTION}
                        onClicked={this.imageBeginnerClick}
                    />
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'continue' ? 'gallery-courses active' : 'gallery-courses'}`}
                        imgSrc={continuer}
                        desc1="Курс ПРОДОЛЖАЮЩИЕ "
                        desc2="6-16 лет"
                        courseName="'ПРОДОЛЖАЮЩИЕ'"
                        selectedCourse="continue"
                        lessons={this.state.lessons}
                        description={CONTINUE_DESCRIPTION}
                        onClicked={this.imageContinueClick}
                    />

                    <Course
                        classNameValue={`${this.state.selectedCourse === 'advanced' ? 'gallery-courses active' : 'gallery-courses'}`}
                        imgSrc={advanced}
                        desc1="Курс ПРОДВИНУТЫЕ"
                        desc2="6-16 лет"
                        courseName="'ПРОДВИНУТЫЕ'"
                        selectedCourse="advanced"
                        lessons={this.state.lessons}
                        description= {ADVANCED_DESCRIPTION}
                        onClicked={this.imageAdvancedClick}
                    />
                    <Course
                        classNameValue={`${this.state.selectedCourse === 'adult' ? 'gallery-courses active' : 'gallery-courses'}`}
                        imgSrc={adult}
                        desc1="Курс ВЗРОСЛЫЕ"
                        desc2="от 13 лет"
                        courseName="'ВЗРОСЛЫЕ'"
                        selectedCourse="adult"
                        lessons={this.state.lessons}
                        description={ADULT_DESCRIPTION}
                        onClicked={this.imageAdultClick}
                    />

                </div>
                <div style={{position: "relative", margin: " 5% auto", alignItems: "center"}}>
                    <Footer />
                </div>
            </div>

        )
    }
}
