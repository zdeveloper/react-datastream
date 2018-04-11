import React, { Component } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import TextView from "./components/TextView";
import TextView2 from "./components/TextView2";
import PluggableSelectBox from "./components/PluggableSelectBox";
import PluggableTextView from "./components/PluggableTextView";

class App extends Component {
  render() {
    return (
      <div className="mt-4">
        <InputBox />
        <TextView />
        <TextView2 />
        <hr />
        <PluggableSelectBox
          model="my-model"
          options={["Xedd", "Flux", "Redux", "Context"]}
        />
        <PluggableTextView model="my-model" />
      </div>
    );
  }
}

export default App;
