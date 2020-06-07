import React, { Component } from "react";
import datastream from "react-datastream";
import { INPUT_STREAM } from "../streams";

class TextView2 extends Component {

  state = { value: "test2" };
  stream;

  componentDidMount() {
    this.stream = datastream.subscribe(INPUT_STREAM, this.handleTextChange);
  }

  componentWillUnmount() {
    this.stream.unsubscribe()
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

export default TextView2;
