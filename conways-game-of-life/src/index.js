import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
const AppWithRouter = withRouter(App);
ReactDOM.render(
  <div className="main">
    <Router>
      <AppWithRouter />
    </Router>
  </div>,
  document.getElementById("root")
);
