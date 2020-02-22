import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as d3 from "d3";
import ReactTooltip from "react-tooltip";

const Layer = ({ data }) => {
  let layerRef = useRef();

  useEffect(() => {
    // if (!d7.length) {
    //   return null
    // }

    //console.log(data);

    let svg = d3.select(layerRef.current);

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("width", 10)
      .attr("height", 24)
      .attr("x", function(d, i) {
        return i * 10 + d.position;
      })
      .attr("y", 0)
      .attr("data-tip","hello world");
  }, [data]);

  return (
    <>
      <g ref={layerRef} />
      <ReactTooltip />
    </>
  );
};

export default Layer;
