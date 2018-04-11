import React, { Component } from "react";
import xedd from "react-xedd";

class PluggableTextView extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "test2" };
    this.handleTextChange = this.handleTextChange.bind(this);
    xedd.subscribe(this.props.model, this.handleTextChange);
  }

  handleTextChange(text) {
    console.log(text);

    this.setState({ value: text });
  }

  render() {
    return (
      <div>
        <p>
          <strong>Selected Option</strong>
        </p>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

export default PluggableTextView;
