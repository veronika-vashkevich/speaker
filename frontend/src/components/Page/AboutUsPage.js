import React, {Component} from "react";
import NonAuthenticatedHeader from "../Header/NonAuthenticatedHeader";
import Footer from "../Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";
import AuthenticationService from "../../services/AuthenticationService";


export default class AboutUsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                { AuthenticationService.getLoggedInUserName() === ''? <NonAuthenticatedHeader selectedLink="about-us" {...this.props}/> : <div></div> }
                <AboutUs/>
                <Footer/>
            </div>
        )
    }
    
    
}