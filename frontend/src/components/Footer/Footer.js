import React, {Component} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

export default class Footer extends Component {
    render() {
        return (
            <MDBFooter color="#1a63ab" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.speak-must.com"> www.speak-must.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        )
    }
    
}