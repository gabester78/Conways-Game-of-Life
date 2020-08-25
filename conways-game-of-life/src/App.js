import React from "react";
import "./App.css";
import Intro from "./components/Intro";
import About from "./components/About";
import Grid from "./components/Grid";

function App() {
  return (
    <div className="App">
      <Intro />
      <About />
      <Grid />
    </div>
  );
}

export default App;
