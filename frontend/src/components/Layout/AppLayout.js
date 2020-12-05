//loads when we specify the APP Route
import React, {Component} from 'react'
import auth from "../Auth/Auth"
import { Provider } from 'react-redux';


export default class AppLayout extends Component {
    
    
    render() {
        return(
            <div>
                <h1>App Layout</h1>
                <button onClick={() => {
                    auth.logout(() => {
                        this.props.history.push("/");
                    });
                }}>Log out</button>
            </div>
        )
    }
}
