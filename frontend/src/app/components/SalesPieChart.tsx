"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataItem {
  YEAR_ID: string;
  SALES: number;
}

interface Props {
  data: DataItem[];
}

const PieChart: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 700;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3
      .pie<DataItem>()
      .sort(null)
      .value((d: { SALES: any }) => d.SALES);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arcs = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: { data: { YEAR_ID: any } }) => color(d.data.YEAR_ID))
      .on("mouseover", function (event, d) {
        // Show tooltip with sales information
        const tooltip = d3.select("#tooltip");
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `<strong>Year:</strong> ${
              d.data.YEAR_ID
            }<br/><strong>Sales:</strong> $${d.data.SALES.toFixed(2)}`
          )
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", function () {
        // Hide tooltip
        const tooltip = d3.select("#tooltip");
        tooltip.transition().duration(200).style("opacity", 0);
      });

    arcs
      .append("text")
      .attr("transform", function (d: any) {
        const [x, y] = arc.centroid(d);
        return `translate(${x}, ${y})`;
      })
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.YEAR_ID);

    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d: any, i: number) => `translate(-${width / 2},${i * 30 - height / 2})` // Adjust spacing here
      );

    legend
      .append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d: { YEAR_ID: any }) => color(d.YEAR_ID));

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text((d: { YEAR_ID: any }) => d.YEAR_ID);
  }, [data]);

  return (
    <div style={{ width: "800px", height: "600px" }}>
      <svg ref={svgRef}></svg>
      <div
        id="tooltip"
        style={{
          opacity: 0,
          position: "absolute",
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid black",
          color: "black",
        }}
      ></div>
    </div>
  );
};

export default PieChart;
