import React, { Component } from "react";
import xedd from "../xedd";
import { INPUT_STREAM } from "../streams";

class InputBox extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    xedd.publish(INPUT_STREAM, event.target.value);
  }

  render() {
    return (
      <div className="form-group">
        <input
          type="text"
          placeholder="type here..."
          className="form-control"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default InputBox;
