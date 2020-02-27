import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import ReactTooltip from "react-tooltip";

const Bins = ({
  data,
  axis,
  width,
  tooltip,
  // handleBinClick,
  //setBinsColorScale
  binsColorScale,
  aa,
  maxAAEntropy
}) => {
  let layerRef = useRef();

  useEffect(() => {

    let data0 = data.map(d => {
      return {
        count: +d[aa + "_AA+"],
        position: d.position
      };
    });

    var max = maxAAEntropy; //d3.max(data0, d => d.count);

    var colors = d3
      .scaleLinear()
      .domain([0, max / 4, max])
      .range(["lightgrey", "yellow", "red"]);

    let svg = d3.select(layerRef.current);

    svg.selectAll("g").remove();

    let x = d3
      .scaleBand()
      .domain(
        data0.map(function(d) {
          return d.position;
        })
      )
      .range([0, width - 150])
      .padding(0.1);

    svg
      .append("g")
      .selectAll("rect")
      .data(data0)
      .join("rect")
      .attr("x", d => x(d.position))
      .attr("width", d => x.bandwidth())
      .attr("y", 0)
      .attr("height", 16)
      .attr("fill", d => {
        return colors(d.count);
      })
      .on("click", d => {
        if (!tooltip) {
          return null;
        } else {
          // handleBinClick(d);
        }
      })
      .attr("data-for", () => {
        if (!tooltip) {
          return null;
        }

        return "svgTooltip";
      })
      .attr("data-tip", d => {
        //{position: 1, coverage: 44625, count: 28.06}

        if (!tooltip) {
          return null;
        }

        return (
          "BIN Number: " + d.position + "</br>Count: " + d.count.toFixed(2)
        );
      });

    if (axis) {
      var xAxis = d3.axisTop(x).tickValues(
        x.domain().filter(function(d, i) {
          return !(i % 10);
        })
      );

      svg
        .append("g")
        .attr("class", "x axis")
        .call(xAxis);
    }

    ReactTooltip.rebuild();
  }, [data, axis, width, tooltip, binsColorScale, maxAAEntropy, aa]);

  return (
    <>
      <g ref={layerRef} />
    </>
  );
};

export default Bins;
