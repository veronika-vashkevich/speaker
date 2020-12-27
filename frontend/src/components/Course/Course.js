import React, {Component} from 'react';
import './Course.scss'
// import "../../components/Header/Header.scss"
import CourseLessons from "./CourseLessons";
import EnrollPopup from "../Popup/EnrollPopup";
import Popup from "../Popup/Popup";


export default class Course extends Component {

    constructor(props) {
        super(props);
        this.props = {
            state: '',
            imgSrc: '',
            desc1: '',
            desc2: '',
            courseName: '',
            selectedCourse: '',
            lessons: [],
            
        };
        this.state ={
            showPopup: false
        };
        
        console.log(this.props);
    }

    togglePopup() {
        console.log("toggle ")
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    render() {
        return (
                <div
                    onClick={this.props.onClicked}
                    className={this.props.classNameValue}>

                    <a target="_blank">
                        <img src={this.props.imgSrc}/>
                        <div className="desc margin-left">{this.props.desc1}</div>
                        <div className="desc margin-left">{this.props.desc2}</div>
                        <button className='Header-ExitBtn btn btn-primary margin-left padding-top' onClick={() => {
                             this.togglePopup()
                        }}> ЗАПИСАТЬСЯ
                        </button>
                    </a>

                    {this.state.showPopup ?
                        <EnrollPopup
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                    <CourseLessons courseName={this.props.courseName} selectedCourse={this.props.selectedCourse}
                                   lessons={this.props.lessons}/>

                </div>

        )
    }
}