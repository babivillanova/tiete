import React from "react";
import Typewriter from "typewriter-effect";
import "./Typewriter.css";

function TypewriterComponent() {
  return (
    <div className="typewriter">
      <h1>
        <Typewriter
          options={{
            strings: ["SHOW YOUR SUPPORT", "NO REASON TO SIT STILL", "BECOME A VERIFIED FAN"],
            autoStart: true,
            loop: true,
            cursor: " ",
            delay: 10,
            pauseFor: 5000,
            changeDeleteSpeed: 5,
          }}
        />
      </h1>
    </div>
  );
}

export default TypewriterComponent;
