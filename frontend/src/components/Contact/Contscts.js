import React, {Component} from "react";
import "../../components/Header/Header.scss"
import "./Contacts.scss"

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
        this.state = {
            showPopup: false
        };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        return (
            <div className="content-wrap-contacts">
                <div className="project-item">
                    <div><h1>Email:</h1></div>
                    <div><h2>speakmast@gmail.com</h2></div>
                    <div><h1>WhatsApp / Viber:</h1></div>
                    <div> <h2>+375 44 53 45 678</h2></div>
                </div>
            </div>

        )
    }
}