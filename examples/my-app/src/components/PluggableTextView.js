import React, { Component } from "react";
import datastream from "react-datastream";

class PluggableTextView extends Component {

  state = { value: "No value recieved yet" };

  componentDidMount() {
    datastream.subscribe(this.props.stream, this.handleTextChange);
  }

  handleTextChange = (text) => {
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
