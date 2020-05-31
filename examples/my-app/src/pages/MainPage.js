import React, { Component } from "react";
import InputBox from "../components/InputBox";
import TextView from "../components/TextView";
import TextView2 from "../components/TextView2";
import PluggableTextView from "../components/PluggableTextView";

class MainPage extends Component {

    render() {
        return (
            <div className="mt-4">
                <InputBox />
                <p>The following two text boxes are listening to text changes:</p>
                <TextView />
                <TextView2 />
                <hr />
                <p>This is set from the settings page</p>
                <PluggableTextView />
            </div>
        )
    }
}

export default MainPage;