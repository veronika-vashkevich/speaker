import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import RegistrationService from '../../services/RegistrationService.js';
import AuthenticationService from '../../services/AuthenticationService.js'
import './LoginPage.scss'
import Footer from "../Footer/Footer";
import '../../components/Header/Header.scss'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
// import '../Page/dropdown.scss'


const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
]

class RegisterPageV2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.registerClicked = this.registerClicked.bind(this);
    }


    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }


    registerClicked(event) {
        event.preventDefault();

        if (this.validate()) {
            console.log(this.state);
            let input = this.state.input;

            // let input = {};
            // input["name"] = "";
            // input["email"] = "";
            // input["password"] = "";
            // input["confirm_password"] = "";
            // this.setState({input:input});

            // alert('Demo Form is submited');
            //
            RegistrationService
                .registerNewUser(input["name"], input["email"], input["password"]);

            AuthenticationService
                .executeJwtAuthenticationService(input["email"], input["password"])
                .then((response) => {
                    AuthenticationService.registerSuccessfulregisterForJwt(input["email"], response.data.accessToken);
                    if (response.status === 200) {
                        console.log("response", response);
                        this.setState({hasRegisterFailed: false});
                    }
                    this.props.history.push(`/`)
                }).catch(() => {
                this.setState({showSuccessMessage: false});
                this.setState({hasRegisterFailed: true});
                console.log("error");
            })
        }

    }


    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your name.";
        }

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }

        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["password"] != input["confirm_password"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <div /*className="position-relative"*/>
                {/*<registerForm />*/}
                <NonAuthenticatedHeader/>
                {/*{this.state.hasRegisterFailed &&*/}
                {/*<div className=" alert alert-warning">Имя пользователя или пароль неверные</div>}*/}
                <div className="grid-container">
                    {/*<ShowInvalidCredentials hasRegisterFailed={this.state.hasRegisterFailed}/>*/}
                    {this.state.showSuccessMessage && <div>Вы успешно зарегистрировались!</div>}

                    <div className="grid-item-left">
                        Вашe имя:
                    </div>
                    <div className="grid-item-right">
                        <input
                            type="text"
                            name="name"
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter name"
                            id="name"/>

                        <div className="text-danger">{this.state.errors.name}</div>
                    </div>

                    <div className="grid-item-left">
                        Ваш email:
                    </div>
                    <div className="grid-item-right">
                        {/*<input type="text" placeholder="user name" name="email" value={this.state.email} onChange={this.handleChange}/>*/}
                        {/*<label htmlFor="name">Name:</label>*/}
                        <input
                            type="text"
                            name="email"
                            value={this.state.input.email}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter email"
                            id="email"/>

                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>

                    <div className="grid-item-left">
                        Пароль:
                    </div>
                    <div className="grid-item-right">
                        <input
                            type="password"
                            name="password"
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter password"
                            id="password"/>

                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>


                    <div className="grid-item-left">
                        Подтвердите пароль:
                    </div>
                    <div className="grid-item-right">
                        <input
                            type="password"
                            name="confirm_password"
                            value={this.state.input.confirm_password}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter confirm password"
                            id="confirm_password"/>

                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                    </div>


                    <div className="grid-item-left">
                        Роль:
                    </div>


                    <Dropdown placeholder='Skills' fluid multiple selection options={options} />


                    {/*<ShowregisterSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}


                </div>
                <div className="buttons">
                    <button className="btn btn-success Header-ExitBtn  btn-primary enter-btn"
                            onClick={this.registerClicked}>Зарегистрироваться
                    </button>
                </div>

                <Dropdown placeholder='Skills' fluid multiple selection options={options} />
                <Footer/>
            </div>


        )
    }

}

export default RegisterPageV2

