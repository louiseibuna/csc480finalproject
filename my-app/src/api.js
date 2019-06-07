constructor(props) {
    super(props);
    this.state = { result: "" };
}

callAPI(username) {
    fetch("http://localhost:3000/Predictor" + "?" + username, {method: 'GET'})
        .then(res => this.setState({ result: res.prediction }));
}