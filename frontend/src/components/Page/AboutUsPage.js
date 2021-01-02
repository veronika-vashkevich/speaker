import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Footer from "../Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";
import AuthenticationService from "../../services/AuthenticationService";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";


export default class AboutUsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedUser: ''

        };
    }

    componentWillMount() {
        let user = AuthenticationService.getLoggedInUserName();
        this.setState({
            loggedUser: user
        });
    }

    render() {
        return (
            <div>
                { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="about-us" {...this.props}/> :
                    <AuthenticatedHeader  selectedLink="about-us" loggedUser={this.state.loggedUser} {...this.props}/>}
                <AboutUs/>
                <Footer/>
            </div>
        )
    }


}
