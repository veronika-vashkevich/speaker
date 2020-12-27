import React, {Component} from "react";
// import './Course.scss'
import "../../components/Header/Header.scss"
import  "./Contacts.scss"

export default class Contacts extends Component {

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
            <div className="content-wrap-contacts">
                <div className="project-item">
                    {/*<img src="images/project-courses.jpg" alt="Lynda & LinkedIn Learning course list">*/}
                    <div>Email:</div>
                    <div>marie.stankevich.10@gmail.com</div>
                    <div>WhatsApp / Viber:</div>
                    <div> +375 44 53 45 678</div>
                    {/*<a className="btn"*/}
                    {/*    href="https://www.linkedin.com/learning/instructors/christina-truong?u=2125562"*/}
                    {/*    target="_blank">LinkedIn Learning</a>*/}
                    {/*<a className="btn" href="https://www.lynda.com/Christina-Truong/7842227-1.html">Lynda.com</a>*/}
                </div>
            </div>

        )
    }
}