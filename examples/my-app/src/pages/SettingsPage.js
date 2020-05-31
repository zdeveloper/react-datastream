import React, { Component } from "react";
import PluggableSelectBox from "../components/PluggableSelectBox";

class SettingsPage extends Component {

    render() {
        return (
            <div>
                Settings here
                <PluggableSelectBox
                    options={[
                        "",
                        "react-datastream",
                        "Flux",
                        "Redux",
                        "Context"]}
                />
            </div>
        )
    }
}

export default SettingsPage;