import React, { Component } from 'react';

import Home from './components/Home/Home'
import Lessons from './components/Lessons/Lessons'

import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Lessons/>
            </div>
        );
    }
}

export default App;