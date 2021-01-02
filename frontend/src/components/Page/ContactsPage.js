import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Footer from "../Footer/Footer";
import Contacts from "../../components/Contact/Contscts"
import AuthenticationService from "../../services/AuthenticationService";
import AuthenticatedHeader from "../Header/AuthenticatedHeader";

export default class ContactsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedUser: ''
        };
    }
    componentWillMount() {
        console.log("/home")
        let user = AuthenticationService.getLoggedInUserName();
        this.setState({
            loggedUser: user
        });
        console.log("username is ", user)
    }

    render() {
        return (
            <div>
                { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="contacts" {...this.props}/> :
                    <AuthenticatedHeader  selectedLink="about-us" loggedUser={this.state.loggedUser} {...this.props}/>}
                <Contacts/>
                <Footer/>
            </div>
        )
    }


}
