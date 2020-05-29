import React, { Component } from "react";
import datastream from "react-datastream";
import { INPUT_STREAM } from "../streams";

class TextView extends Component {

  state = { value: "test" };

  componentDidMount(){
    datastream.subscribe(INPUT_STREAM, this.handleTextChange);
  }

  handleTextChange = (text) => {
    this.setState({ value: text });
  }

  render() {
    return (
      <div>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

export default TextView;
