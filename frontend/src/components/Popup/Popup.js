import React from 'react';
import './Popup.scss';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            text: 'default text'
        }
    }
    render() {
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    <h1>{this.props.text}</h1>
                    <button className="Header-ExitBtn btn btn-primary bold btn-bot" onClick={this.props.closePopup}>СПАСИБО!</button>
                </div>
            </div>
        );
    }
}

export default Popup;