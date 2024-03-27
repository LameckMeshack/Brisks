"use client";
// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// interface DataItem {
//   YEAR_ID: string;
//   SALES: number;
// }

// interface Props {
//   data: DataItem[];
// }

// const PieChart: React.FC<Props> = ({ data }) => {
//   const svgRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const width = 500;
//     const height = 300;
//     const radius = Math.min(width, height) / 2;

//     const color = d3.scaleOrdinal(d3.schemeCategory10);

//     const arc = d3
//       .arc()
//       .outerRadius(radius - 10)
//       .innerRadius(0);

//     const pie = d3
//       .pie<DataItem>()
//       .sort(null)
//       .value((d: { SALES: any }) => d.SALES);

//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${width / 2},${height / 2})`);

//     const arcs = svg
//       .selectAll(".arc")
//       .data(pie(data))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     arcs
//       .append("path")
//       .attr("d", arc)
//       .attr("fill", (d: { data: { YEAR_ID: any } }) => color(d.data.YEAR_ID));

//     const legend = svg
//       .selectAll(".legend")
//       .data(data)
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr(
//         "transform",
//         (d: any, i: number) => `translate(-${width / 2},${i * 20 - height / 2})`
//       );

//     legend
//       .append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", (d: { YEAR_ID: any }) => color(d.YEAR_ID));

//     legend
//       .append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "end")
//       .text((d: { YEAR_ID: any }) => d.YEAR_ID);
//   }, [data]);

//   return <svg ref={svgRef}></svg>;
// };

// export default PieChart;

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

    const width = 500;
    const height = 300;
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
        d3.select(this).transition().duration(200).attr("opacity", 0.7);
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration(200).attr("opacity", 1);
      })
      .transition()
      .duration(1000)
      .attrTween("d", function (d: any) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t: any) {
          return arc(interpolate(t));
        };
      });

    arcs
      .append("text")
      .attr("transform", function (d: any) {
        const [x, y] = arc.centroid(d);
        return `translate(${x}, ${y})`;
      })
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.YEAR_ID);

    arcs
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function (d: any) {
            const [x, y] = arc.centroid(d);
            const offset = 10; // adjust as needed
            const angle = Math.atan2(y, x);
            const newX = x + offset * Math.cos(angle);
            const newY = y + offset * Math.sin(angle);
            return `translate(${newX}, ${newY})`;
          });
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)");
      });

    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d: any, i: number) => `translate(-${width / 2},${i * 20 - height / 2})`
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

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
