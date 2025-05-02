import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const CategoryPieChart = ({ expenses }) => {
  const ref = useRef();
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  // Group expenses by category
  const categoryData = d3
    .rollups(
      expenses,
      (v) => d3.sum(v, (d) => d.amount),
      (d) => d.category
    )
    .map(([label, value]) => ({ label, value }));

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(categoryData.map((d) => d.label))
      .range(d3.schemeSet2);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = g.selectAll("arc").data(pie(categoryData)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label));

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text((d) => d.data.label);
  }, [expenses]);

  return <svg ref={ref}></svg>;
};

export default CategoryPieChart;
