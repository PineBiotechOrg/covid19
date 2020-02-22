import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import ReactTooltip from "react-tooltip";

const ProteinsCovid = ({ data, width, handleBinClick }) => {
  let layerRef = useRef();

  useEffect(() => {
    let svg = d3.select(layerRef.current);

    svg.selectAll("g").remove();

    let x = d3
      .scaleLinear()
      .domain([1, 29903])
      .range([0, width - 150]);

    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => {
        return x(+d.start);
      })
      .attr("width", d => {
        return x(d.end) - x(d.start)
      })
      .attr("y", 0)
      .attr("fill", "lightgrey")
      .attr("stroke", "black")
      .attr("height", 40)
      .attr("data-for", () => {
        // if (!tooltip) {
        //   return null;
        // }

        return "svgTooltip";
      })
      .on("click", d => {

          handleBinClick(d);
      
      })
      .attr("data-tip", d => {
        //{position: 1, coverage: 44625, count: 28.06}

        // if (!tooltip) {
        //   return null;
        // }

        return (
          "Protein ID: " + d.protein_id 
        );
      });

      ReactTooltip.rebuild();

  }, [data, width, handleBinClick]);

  return (
    <>
      <g ref={layerRef} />
      {/* <rect width={100} height={100}></rect> */}
    </>
  );
};

export default ProteinsCovid;
