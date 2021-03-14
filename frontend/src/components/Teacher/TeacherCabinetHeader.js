import React, {Component} from 'react'

import './TeacherCourses.scss'

export default class TeacherCabinetHeader extends Component {
    constructor(props) {
        super(props);
        this.props = {
            selectedCourse: ""
        };
    }


    componentDidMount() {
        console.log("Course header, selected course", this.props.selectedCourse);
    }


    render() {
        return (
            <div className="Teacher-Header">
                <a className={this.props.selectedCourse === 'courses' ? 'active-course-header-teacher' : ''}
                   href="/my-cabinet"> Курсы </a>
                <a className={this.props.selectedCourse === 'students' ? 'active-course-header-teacher' : ''}
                    href="/courses/continue"> Ученики </a>
            </div>
        )
    }
}
