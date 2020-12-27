import React, {Component} from 'react'
import '../Home/Home.scss'
import ContactMeService from "../../services/ContactMeService";
import Popup from '../../components/Popup/Popup';


export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            phone: '',
            showPopup: false
        };
        this.props = {
            text: 'СВЯЗАТЬСЯ СО МНОЙ'
        }
    }

    contactMeClicked() {
        console.log(this.state.email)
        console.log("email from props is")
        //  ContactMeService.sendContactMeRequest(this.state.name, this.state.email, this.state.phone);
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

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    submitEmail(e) {
        console.log("submitEmail")
        // e.preventDefault();
        // axios({
        //     method: "POST",
        //     url: "/send",
        //     data: this.state
        // }).then((response) => {
        //     if (response.data.status === 'success') {
        //         alert("Message Sent.");
        //         this.resetForm()
        //     } else if (response.data.status === 'fail') {
        //         alert("Message failed to send.")
        //     }
        // })
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:8080/api/contacts/contact-me', {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'isAuthRequired': false
                },
            }
            // ).then(
            //     (response) => (response.json())
        ).then((response) => {
            console.log("Response is ", response);

            if (response.status === 200) {
                //alert("Message Sent.");
                this.togglePopup();
                this.resetForm();
            } else if (response.status !== 200) {
                alert("Message failed to send.")
            }
        })
    }

    resetForm() {
        this.setState({name: '', email: '', phone: ''})
    }

    render() {
        return (
            <div className="Contact-me">
                <div>
                    <h2 className="title">{this.state.text}</h2>
                    <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
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
                                    <button type="submit" className="Header-ExitBtn btn btn-primary bold"
                                        /*onClick={this.contactMeClicked.bind(this) this.togglePopup.bind(this)}*/>
                                        СВЯЗАТЬСЯ СО МНОЙ
                                    </button>

                                    {this.state.showPopup ?
                                        <Popup
                                            text={"ВАШ EMAIL УСПЕШНО СОХРАНЕН В НАШЕЙ СИСТЕМЕ.\n" +
                                            "МЫ СВЯЖЕМСЯ С ВАМИ В ТЕЧЕНИЕ 24 ЧАСОВ"}
                                            closePopup={this.togglePopup.bind(this)}
                                        />
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}