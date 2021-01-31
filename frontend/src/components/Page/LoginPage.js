import React, {Component} from 'react'
import AuthenticationService from '../../services/AuthenticationService.js'
import './LoginPage.scss'
import Footer from "../Footer/Footer";
import SchoolLogo from "../Header/SchoolLogo";
import '../../components/Header/Header.scss'
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.email, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.email, response.data.accessToken);
                if (response.status === 200) {
                    console.log("response", response);
                    this.setState({hasLoginFailed: false});
                }
                this.props.history.push(`/`)
            }).catch(() => {
            this.setState({showSuccessMessage: false});
            this.setState({hasLoginFailed: true});
            console.log("error");
        })
    }

    render() {
        return (
            <div /*className="position-relative"*/>
                {/*<LoginForm />*/}
                <NonAuthenticatedHeader />
                {this.state.hasLoginFailed && <div className=" alert alert-warning">Имя пользователя или пароль неверные</div>}
                    <div className="grid-container">
                        {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                        {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                        <div className="grid-item-left">
                            Имя пользователя:
                        </div>
                        <div className="grid-item-right">
                            <input type="text" placeholder="user name" name="email"
                                   value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        <div className="grid-item-left">
                            Пароль:
                        </div>
                        <div className="grid-item-right">
                            <input type="password" placeholder="password" name="password"
                                   value={this.state.password} onChange={this.handleChange}/>
                        </div>

                        {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}

                    </div>
                   <div className="buttons">
                       <button  className="btn btn-success Header-ExitBtn  btn-primary enter-btn"
                               onClick={this.loginClicked}>Войти
                       </button>
                   </div>
                <div className="buttons">
                    <button className="btn btn-success Header-ExitBtn  btn-primary enter-btn"
                            onClick={this.loginClicked}>Я забыл пароль
                    </button>
                </div>

                <Footer/>
            </div>


        )
    }
}

export default LoginPage
