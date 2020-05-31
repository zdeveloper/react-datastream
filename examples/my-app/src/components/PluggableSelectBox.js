import React, { Component } from "react";
import datastream from "react-datastream";
import { SELECTION_STREAM } from "../streams"

class PluggableSelectBox extends Component {


  constructor(props) {
    super(props);
    this.state = { value: this.props.options[0] };
  }


  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    datastream.publish(SELECTION_STREAM, this.state.value);
    event.preventDefault();
  }

  render() {
    const selectOptions = this.props.options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your state manager:
          <select value={this.state.value} onChange={this.handleChange}>
            {selectOptions}
          </select>
        </label>
        <input type="submit" value="Save" />
      </form>
    );
  }
}

export default PluggableSelectBox;
