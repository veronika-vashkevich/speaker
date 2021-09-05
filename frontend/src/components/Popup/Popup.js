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
        // window.onload = function(){
        //     document.getElementById('close').onclick = function(){
        //         this.parentNode.parentNode.parentNode
        //             .removeChild(this.parentNode.parentNode);
        //         return false;
        //     };
        // };

        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    {/*<span id='close'*/}
                    {/*      onClick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode); return false;'>x</span>*/}

                    <h1>{this.props.text}</h1>
                    <button className="Header-ExitBtn btn btn-primary bold btn-bot" onClick={this.props.closePopup}>СПАСИБО!</button>
                </div>
            </div>
        );
    }
}

export default Popup;