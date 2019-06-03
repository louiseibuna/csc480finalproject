// import React from 'react';
// import logo from './logo.svg';
// import {
//   Modal, Button, FormControl, FormGroup
// } from 'react-bootstrap';
// import './App.css';
// import { userInfo } from 'os';


import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import logo from './twitter_logo.png'
import 'bootstrap/dist/css/bootstrap.css';

import store from './store.js';
import {Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: null,
        result: null,
        tweet: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ username: e.target.value});
  }

  componentWillMount() {
    fetch('');
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="logo">
            <img src="https://www.adweek.com/wp-content/uploads/2017/04/perspective-twitter-head-content-2017-1320x650.png" 
            alt="logo"  width="350" height="200" /> 
          </div>
        
        <form id="userInput">
          <FormGroup 
          >
              {/* <ControlLabel>Conversation Title</ControlLabel> */}
              <FormControl
                type="text"
                value={this.username}
                placeholder={""}
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
          </FormGroup>
        </form>
        </div>
      </Provider>
    );
  }
}

export default App;
