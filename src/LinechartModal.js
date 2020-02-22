import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Linechart = ({ width, data, colors, unChecked }) => {

  let layerRef = useRef();

  useEffect(() => {
    let width0 = width - 150;
    let height = 100;

    let svg = d3.select(layerRef.current);

    svg.selectAll("g").remove();

    var xDomainMax = data.map(d => {
      return d3.max(d.value, n => n.coverage);
    });

    // Define scales
    var xScale = d3
      .scaleLinear()
      .range([0, width0])
      .domain([
        data[0].value[0].position,
        data[0].value[data[0].value.length - 1].position
      ]);
    var yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(xDomainMax)]);

    // Define axes
    // var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3
      .axisRight()
      .scale(yScale)
      .ticks(4);
    //.tickSize(width0);

    // Define lines
    var line = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x(function(d) {
        return xScale(d["position"]);
      })
      .y(function(d) {
        return yScale(d["coverage"]);
      });

    // Define svg canvas
    svg
      .attr("width", width0)
      .attr("height", height)
      .append("g");

    // Set the color domain equal to the three product categories
    // var productCategories = d3.keys(data[0]).filter(function(key) {
    //   return key !== "Order Month" && key !== "metric";
    // });
    // color.domain(productCategories);


    // Format the data field
    data.forEach(function(d) {
      //d["Order Month"] = parseDate(d["Order Month"]);
    });

    // Filter the data to only include a single metric
    // var subset = data.filter(function(el) {
    //   return el.metric === "Quantity";
    // });

    // Reformat data to make it more copasetic for d3
    // data = An array of objects
    // concentrations = An array of three objects, each of which contains an array of objects

    // {name, value}

    // x - position
    // y - coverage

    // var concentrations = data.map(function(category) {
    //   return {
    //     category: category.name,
    //     datapoints: category.value.map(function(d) {
    //       return { position: d.position, coverage: d.coverage };
    //     })
    //   };
    // });


    // Place the axes on the chart
    // svg
    //   .append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);
    // .append("text")
    // .attr("class", "label")
    // .attr("y", 6)
    // .attr("dy", ".71em")
    // .attr("dx", ".71em")
    //.style("stroke-dasharray", "5 5")
    //.style("text-anchor", "beginning")

    var products = svg
      .selectAll(".category")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "category");

    products
      .append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        if (unChecked.indexOf(d.name) !== -1) {
          return null;
        }
        return line(d.value);
      })
      .style("stroke", function(d, i) {
        return colors[i];
      })
      .style("fill", "none");
  }, [width, data, colors, unChecked]);

  return <g ref={layerRef}> </g>;
  //<rect width={width - 150} height="170" fill={"lightgrey"} />;
};

export default Linechart;
