import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import blue_twitter_logo from './twitter_logo.png';
import black_twitter_logo from './black_twitter_logo.jpg';
import 'bootstrap/dist/css/bootstrap.css';

import store from './store.js';
import {Form, FormGroup, FormControl, FormLabel, Button, Alert} from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: null,
        prediction: null,
        tweet: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.getResult = this.getResult.bind(this);
  }

  handleChange(e) {
    console.log("getting user name");
    this.setState({ username: e.target.value});
  }

  componentWillMount() {
    fetch('');
  }

  getResult() {
    const headers = new Headers();
    headers.set('Content-Type', 'application/JSON');
    headers.set('Accept', 'application/JSON');
    const reqConf = {
        headers: headers,
    };

    console.log("getting result for "+ this.state.username);
    fetch("http://localhost:3000/Predictor?username=" + this.state.username, 
          {method: 'GET',
          mode: 'cors',
          ...reqConf})
        .then(res => res.json())
        .then( (res) => {
          this.setState({ prediction: res.pred, username: null});
         });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="logo">
            <img src={blue_twitter_logo}
            alt="logo1"  width="390" height="250" /> 
            <img src={black_twitter_logo}
            alt="logo2"  width="390" height="250" /> 
          </div>

          <p>Type a Twitter user name into the text box below to
             predict whether that person is depressed or not.  </p>
        
        <form id="userInput">
          <FormGroup 
          >
              <FormControl
                type="text"
                value={this.username}
                placeholder={"Type user name here"}
                onChange={this.handleChange}
                className="input"
              />
              <FormControl.Feedback />
          </FormGroup>

          <Button variant="primary"
            onClick={()=> this.getResult()}>Start Prediction</Button>

          {showResult(this.state)}
        </form>
        </div>
      </Provider>
    );
  }
}

function DepressedResult(props) {
  return <Alert variant='danger' className='info'>
      You are depressed. You should talk to someone. 
  </Alert>
}

function NonDepressedResult(props) {
  return <Alert variant='success' className='info'>
      Congratulations!!! You are not depressed
  </Alert>
}

function NotEnoughTweets(props) {
  return <Alert variant='warning' className='info'>
      Don't have enough tweets for prediction
  </Alert>
}

function showResult(props) {
  if (props.prediction === 0) {
    return <NonDepressedResult/>;
  } else if (props.prediction === 1) {
    return <DepressedResult/>;
  } else {
    return <NotEnoughTweets/>;
  }
}

export default App;
