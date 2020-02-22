import React from "react";

function CheckBox({ name, active }) {
  return (
    <g className="check-box">
      <path
        d="M 11 4 C 7.1 4 4 7.1 4 11 L 4 39 4 39 C 4 42.9 7.1 46 11 46 L 39 46 C 42.9 46 46 42.9 46 39 L 46 11 46 11 C 46 7.1 42.9 4 39 4 L 11 4"
        transform="matrix(0.4 0 0 0.4 0 -2)"
        className="unchecked-external-path"
        style={active ? { fill: "white" } : { fill: "black" }}
      ></path>
      <path
        d="M 44 39 C 44 41.8 41.8 44 39 44 L 11 44 C 8.2 44 6 41.8 6 39 L 6 11 C 6 8.2 8.2 6 11 6 L 39 6 C 41.8 6 44 8.2 44 11"
        transform="matrix(0.4 0 0 0.4 0 -2)"
        className="unchecked-internal-path"
        style={
          active ? { display: "none" } : { display: "inline", fill: "#EFEFEF" }
        } // inline
      ></path>
      <path
        d="M 11 4 C 7.1 4 4 7.1 4 11 L 4 39 C 4 42.9 7.1 46 11 46 L 39 46 C 42.9 46 46 42.9 46 39 L 46 15 L 44 17.3 L 44 39 C 44 41.8 41.8 44 39 44 L 11 44 C 8.2 44 6 41.8 6 39 L 6 11 C 6 8.2 8.2 6 11 6 L 37.4 6 L 39 4 L 11 4 z M 43.2 7.7 L 23.9 30.5 L 15.7 22.9 L 14.4 24.4 L 23.3 32.7 L 24.0 33.4 L 24.75 32.6 L 44.75 9.0 L 43.2 7.7 z"
        transform="matrix(0.4 0 0 0.4 0 -2)"
        className="checked-path"
        style={
          active ? { display: "inline", fill: "black" } : { display: "none" }
        } // none
      ></path>
      <text x="21" y="15" style={{ fontSize: 13}}>
        {name.split(".")[0]}
      </text>
    </g>
  );
}

export default CheckBox;
