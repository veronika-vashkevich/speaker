import React from 'react';
import '../Popup/Popup.scss';

class EnrollPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            phone: '',
            showPopup: false,
            showSentMessage: ''
        };
        this.props = {
            text: 'default text'
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({showSentMessage: "You enroll request was successfully sent! You've got  a confirmation email! See you soon :)"})

        fetch('http://localhost:8080/api/contacts/contact-me', {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'isAuthRequired': false
                },
            }
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
    //
    // resetForm() {
    //     this.setState({name: '', email: '', phone: ''})
    // }


    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
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

    render() {
        return (
            <div className='popup'>
                <button className="close" onClick={this.props.closePopup}>X</button>
                <div className='popup\_inner'>
                    <div className="Contact-me">
                        <div>
                            <h2 className="title">{this.state.text}</h2>
                            <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                                <div style={{width: "100%"}}>
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
                                            <button type="submit" 
                                                    className="Header-ExitBtn btn btn-primary bold"
                                                    // onClick={this.contactMeClicked.bind(this)}
                                            >
                                                ЗАПИСАТЬСЯ
                                            </button>
                                        
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <h1>{this.state.showSentMessage}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default EnrollPopup;