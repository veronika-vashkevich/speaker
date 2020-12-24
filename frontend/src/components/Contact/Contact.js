import React, {Component} from 'react'
import axios from 'axios'
import '../Home/Home.scss'
import AuthenticationService from "../../services/AuthenticationService";
import ContactMeService from "../../services/ContactMeService";

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    }

    contactMeClicked() {
        ContactMeService.sendContactMeRequest(this.state.name, this.state.email, this.state.phone);
    }
    onPhoneChange(event) {
        this.setState({phone: event.target.value})
    }
    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }
    
    submitEmail(e) {
        e.preventDefault();
        axios({
            method: "POST",
            url: "/send",
            data: this.state
        }).then((response) => {
            if (response.data.status === 'success') {
                alert("Message Sent.");
                this.resetForm()
            } else if (response.data.status === 'fail') {
                alert("Message failed to send.")
            }
        })
    }

    resetForm() {
        this.setState({name: '', email: '', subject: '', message: ''})
    }

    render() {
        return (
            <div className="Contact-me">
                <div /*className="row">
                    <div className="col-md-12"*/>
                        <div /*className="sectionTitle"*/>
                            <h2 className="title">СВЯЗАТЬСЯ СО МНОЙ</h2>
                            <form id="contact-form" onSubmit={this.submitEmail.bind(this)} method="POST">
                                <div style={{width: "100%"}}/* className="form-group"*/>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <input placeholder="Имя" id="Name" type="text"
                                                   className="form-control"
                                                   required value={this.state.name}
                                                   onChange={this.onNameChange.bind(this)}/>
                                        </div>
                                        <div className="col-md-4">
                                            <input placeholder="Email" id="email" type="email"
                                                   className="form-control"
                                                   aria-describedby="emailHelp"
                                                   required value={this.state.email}
                                                   onChange={this.onEmailChange.bind(this)}/>
                                        </div>
                                        <div className="col-4">
                                            <input placeholder="Телефон" id="phone" type="text" className="form-control"
                                                   required value={this.state.phone}
                                                   onChange={this.onPhoneChange.bind(this)}/>

                                        </div>

                                        <div className="Contact-me-button">
                                            <button type="submit" className="Header-ExitBtn btn btn-primary bold" onClick={this.contactMeClicked.bind(this)}>
                                                Связаться со мной
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    {/*</div>*/}
                </div>
            </div>
        );
    }

}