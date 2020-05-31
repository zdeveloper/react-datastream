import React, { Component } from "react";
import "./App.css";
import MainPage from "./pages/MainPage"
import SettingsPage from "./pages/SettingsPage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Main</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
