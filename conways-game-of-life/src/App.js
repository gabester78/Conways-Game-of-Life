import React from "react";
import "./App.css";
import Intro from "./components/Intro";
import Grid from "./components/Grid";
import Rules from "./components/Rules";

function App() {
  return (
    <div className="App">
      <Intro />
      <Rules />
      <Grid />
    </div>
  );
}

export default App;
