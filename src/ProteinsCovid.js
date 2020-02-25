import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import ReactTooltip from "react-tooltip";

const ProteinsCovid = ({ data, width, handleBinClick, max }) => {
  let layerRef = useRef();

  useEffect(() => {
    let svg = d3.select(layerRef.current);

    svg.selectAll("g").remove();

    let x = d3
      .scaleLinear()
      .domain([1, max])
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
        return x(d.end) - x(d.start);
      })
      .attr("y", 0)
      .attr("class", d => "protein" + d.start)
      .attr("fill", "grey")
      .style("opacity", d => {
        return +d["protein length"] ? 0.5 : 0.25;
      })
      .attr("stroke", "black")
      .attr("height", 40)
      .attr("data-for", () => {
        // if (!tooltip) {
        //   return null;
        // }

        return "svgTooltip";
      })
      .on("click", d => {
        if (+d["protein length"] === 0) {
          return null;
        }

        handleBinClick(d);
      })
      .on("mouseover", d => {
        if (+d["protein length"] === 0) {
          d3.select(".protein" + d.start).attr("fill", "red");
        } else {
          d3.select(".protein" + d.start).attr("fill", "steelblue");
        }
      })
      .on("mouseout", d => {
        d3.select(".protein" + d.start).attr("fill", "grey");
      })
      .attr("data-tip", d => {
        //{position: 1, coverage: 44625, count: 28.06}

        // if (!tooltip) {
        //   return null;
        // }
        if (+d["protein length"] === 0) {
          return null;
        }
        return "Protein: " + d.product.toUpperCase();
      });

    ReactTooltip.rebuild();

    
  }, [data, width, max]);

  return (
    <>
      <g ref={layerRef} />
      {/* <rect width={100} height={100}></rect> */}
    </>
  );
};

export default ProteinsCovid;
