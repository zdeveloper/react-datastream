import React, { Component } from "react";
import datastream from "react-datastream";
import { INPUT_STREAM } from "../streams";

class InputBox extends Component {

  handleChange = (event) => {
    datastream.publish(INPUT_STREAM, event.target.value);
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
