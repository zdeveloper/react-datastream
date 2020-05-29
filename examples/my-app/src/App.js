import React, { Component } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import TextView from "./components/TextView";
import TextView2 from "./components/TextView2";
import PluggableSelectBox from "./components/PluggableSelectBox";
import PluggableTextView from "./components/PluggableTextView";

class App extends Component {

  render() {
    const stream_name = "my-common-stream-name"
    return (
      <div className="mt-4">
        <InputBox />
        <p>The following two text boxes are listening to text changes:</p>
        <TextView />
        <TextView2 />
        <hr />
        <PluggableSelectBox
          stream={stream_name}
          options={["react-datastream", "Flux", "Redux", "Context"]}
        />
        <PluggableTextView stream={stream_name} />
      </div>
    );
  }
}

export default App;
