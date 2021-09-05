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
                    <div>Email:</div>
                    <div>speakmast@gmail.com</div>
                    <div>WhatsApp / Viber:</div>
                    <div> +375 44 53 45 678</div>
                </div>
            </div>

        )
    }
}