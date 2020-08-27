import React, { useState, useRef } from "react";
import About from "./About";

const Intro = () => {
  const [popup, setPopup] = useState(false);
  const popupRef = useRef(popup);

  return (
    <div className="intro">
      <h1>Welcome to Conway's Game of Life!</h1>
      <button
        onClick={() => {
          setPopup(!popup);
          if (!popup) {
            popupRef.current = true;
          }
        }}
      >
        {popup ? "Close" : "About"}
      </button>
      {popup ? <About /> : null}
    </div>
  );
};

export default Intro;
