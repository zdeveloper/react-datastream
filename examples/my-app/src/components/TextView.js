import React, { Component } from "react";
import xedd from "react-xedd";
import { INPUT_STREAM } from "../streams";

class TextView extends Component {
  constructor() {
    super();
    this.state = { value: "test" };
    this.handleTextChange = this.handleTextChange.bind(this);
    xedd.subscribe(INPUT_STREAM, this.handleTextChange);
  }

  handleTextChange(text) {
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
