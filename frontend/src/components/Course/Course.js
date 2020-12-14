import React, {Component} from 'react';
import './Course.scss'

export default class Course extends Component {

    constructor(props) {
        super(props);
        this.props = {
            classNameValue: '',
            imgSrc: '',
            desc1: '',
            desc2: ''
        };
        console.log(this.props);
    }

    render() {
        return (
            <div
                onClick={this.props.onClicked}
                className={this.props.classNameValue}>
                <a target="_blank">
                    <img src={this.props.imgSrc} width="300" height="100"/>
                </a>
                <div className="desc">{this.props.desc1}</div>
                <div className="desc">{this.props.desc2}</div>
            </div>
        )
    }
}