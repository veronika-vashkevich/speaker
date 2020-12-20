import React, {Component} from 'react';
import './Course.scss'
import CourseLesson from "../Lessons/CourseLesson";

export default class Course extends Component {

    constructor(props) {
        super(props);
        this.props = {
            classNameValue: '',
            imgSrc: '',
            desc1: '',
            desc2: '',
            courseName: '',
            selectedCourse: '',
            lessons: []
        };
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <div
                    onClick={this.props.onClicked}
                    className={this.props.classNameValue}>

                    <a target="_blank">
                        <img src={this.props.imgSrc}/>
                        <div className="desc margin-left">{this.props.desc1}</div>
                        <div className="desc margin-left">{this.props.desc2}</div>
                    </a>


                    <CourseLesson courseName={this.props.courseName} selectedCourse={this.props.selectedCourse}
                                  lessons={this.props.lessons}/>

                </div>
            </div>

        )
    }
}