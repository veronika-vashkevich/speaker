import React, {Component} from "react";
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
            <div className="content-wrap-about">

                    {/*<img src="images/project-courses.jpg" alt="Lynda & LinkedIn Learning course list">*/}
                        <div className="project-item-about"><h1>Hi, my name is Mariya Stankevich</h1></div>
                <div className="project-item-about"><h1>I am in love of what I am doing!</h1></div>
                <div className="project-item-about"><h1>Lets be friends :)</h1></div>
                        <a className="btn btn-primary-about"
                           href="https://www.instagram.com/speak_mast/"
                           target="_blank">Follow me</a>
                        {/*<a className="btn" href="https://www.lynda.com/Christina-Truong/7842227-1.html">Lynda.com</a>*/}
            </div>

        )
    }
}
