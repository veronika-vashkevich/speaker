import React, {Component} from 'react';
import moment from 'moment'
import './CourseLesson.scss'
import LessonDataService from '../../services/LessonDataService'

export default class CourseLessons extends Component {
    constructor(props) {
        console.log('constructor');
        super(props);

        this.props = {
            courseName: '',
            selectedCourse: '',
            message: null,
            lessons: [],
        }
    }

    componentWillMount() {
        console.log('this.props.lessons');
        console.log(this.props.lessons);
    }

    render() {
        console.log('render');
        return (
            <div className="margin-left">
                <h1>Программа курса {this.props.courseName}</h1>
                {/*<table className="table scroll-pane" cellspacing="5">*/}
                <table>
                    <thead>
                    <tr>
                        <th>Номер урока</th>
                        <th>Тема</th>
                        <th>По окончании урока ребенок сможет</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.from(this.props.lessons).map(
                            lesson =>
                                <tr key={lesson.id}>
                                    <td>{lesson.orderIndex}</td>
                                    <td>{lesson.title}</td>
                                    <td>{lesson.content}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}


