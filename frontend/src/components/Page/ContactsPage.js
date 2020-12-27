import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Footer from "../Footer/Footer";
import Contacts from "../../components/Contact/Contscts"
import AuthenticationService from "../../services/AuthenticationService";

export default class ContactsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="contacts" /*{...this.props}*//> : <div></div> }
                {/*<NonAuthenticatedHeader selectedLink="contacts" {...this.props}/>*/}
                <Contacts/>
                <Footer/>
            </div>
        )
    }


}