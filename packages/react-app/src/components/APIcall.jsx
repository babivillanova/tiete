import React, { Component } from "react";

class APIcall extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:8888/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default APIcall;
