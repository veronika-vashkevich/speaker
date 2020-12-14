import React, { Component } from 'react'
import AuthenticationService from '../../services/AuthenticationService.js'
import './LoginPage.scss'
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
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.email, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.email, response.data.token)
                this.props.history.push(`/home`)
            }).catch(() => {
            this.setState({ showSuccessMessage: false })
            this.setState({ hasLoginFailed: true })
        })


    }

    render() {
        return (
            <div className="Home">
                <NonAuthenticatedHeader {...this.props}/>   
                <div className="wrapper">
                    <div className="form-wrapper">
                        <div className="container">
                            {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                            {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                            {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                            {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                            Имя пользователя: <input type="text" placeholder="user name" name="email" value={this.state.email} onChange={this.handleChange} />
                            <h1></h1>
                            <h1></h1>
                            <h1></h1>
                            Пароль: <input type="password"  placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            <button className="btn btn-success Header-ExitBtn  btn-primary '" onClick={this.loginClicked
                            
                            }>Войти</button>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default LoginPage