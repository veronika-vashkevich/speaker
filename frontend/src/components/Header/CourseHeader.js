import React, {Component} from 'react'

import './Header.scss'

export default class CourseHeader extends Component {
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
            <div className="Course-Header">
                <a className={this.props.selectedCourse === 'beginner' ? 'active-course-header' : ''}
                   href="/courses/beginner">курс "НАЧИНАЮЩИЕ" </a>
                <a className={this.props.selectedCourse === 'continue' ? 'active-course-header' : ''}
                    href="/courses/continue">курс "ПРОДОЛЖАЮЩИЕ" </a>
                <a className={this.props.selectedCourse === 'advanced' ? 'active-course-header' : ''}
                    href="/courses/advanced">курс "ПРОДВИНУТЫЕ"</a>
                <a className={this.props.selectedCourse === 'adult' ? 'active-course-header' : ''}
                   href="/courses/adult">курс "ВЗРОСЛЫЕ"</a>
            </div>
        )
    }
}
