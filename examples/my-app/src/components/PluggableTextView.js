import React, { Component } from "react";
import datastream from "react-datastream";
import { SELECTION_STREAM } from "../streams"

class PluggableTextView extends Component {

  state = { value: null };
  stream;

  componentDidMount() {
    this.stream = datastream.subscribe(SELECTION_STREAM, this.handleTextChange);
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
        {this.state.value ?
          <p>Your favorite state manager is <i>{this.state.value}</i></p>
          :
          <p >You havent selected a favorite state manager</p>
        }
        <p></p>
      </div>
    );
  }
}

export default PluggableTextView;
