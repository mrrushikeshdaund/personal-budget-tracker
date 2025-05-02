import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BudgetChart = ({ budget, expenses }) => {
  const ref = useRef();
  const width = 500;
  const height = 350;

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = [
      { label: "Budget", value: budget },
      { label: "Expenses", value: expenses },
    ];

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, chartWidth])
      .padding(0.4);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) * 1.2])
      .range([chartHeight, 0]);

    g.append("g").call(d3.axisLeft(y));

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => chartHeight - y(d.value))
      .attr("fill", (d) => (d.label === "Budget" ? "#4CAF50" : "#F44336"));

    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .text((d) => `₹${d.value}`)
      .attr("x", (d) => x(d.label) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px");
  }, [budget, expenses]);

  return <svg ref={ref}></svg>;
};

export default BudgetChart;
