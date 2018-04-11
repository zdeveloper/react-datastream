import React, { Component } from "react";
import xedd from "../xedd";
import { INPUT_STREAM } from "../streams";

class TextView2 extends Component {
  constructor() {
    super();
    this.state = { value: "test2" };
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

export default TextView2;
