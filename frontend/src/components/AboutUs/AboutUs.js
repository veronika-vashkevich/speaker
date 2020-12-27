import React, {Component} from "react";
// import './Course.scss'
import "../../components/Header/Header.scss"
import  "../../components/Course/CoursesPage.scss"
import  "./AboutUs.scss"


export default class AboutUs extends Component {

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
            <div className="content-wrap">
                <div className="project-item">
                    {/*<img src="images/project-courses.jpg" alt="Lynda & LinkedIn Learning course list">*/}
                        <h3>Lynda / LinkedIn Learning Courses</h3>
                        <div>Developed content and instruction for various CSS and front-end focused web development
                            courses including CSS Essential Training, Getting Your Website Online, Design Systems &
                            Architectures and more.</div>
                        <a className="btn"
                           href="https://www.linkedin.com/learning/instructors/christina-truong?u=2125562"
                           target="_blank">Follow us</a>
                        {/*<a className="btn" href="https://www.lynda.com/Christina-Truong/7842227-1.html">Lynda.com</a>*/}
                </div>
            </div>

        )
    }
}