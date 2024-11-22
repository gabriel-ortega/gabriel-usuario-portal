import * as d3 from "d3";
import { useState, useEffect } from "react";

const source = [
  { source: "Application", value: 1200 },
  { source: "Evaluation", value: 50 },
  { source: "First Interview", value: 1000 },
  { source: "Second Interview", value: 245 },
  { source: "Gap Pool", value: 452 },
];

export default function GraphicsStage() {
  const [data, setData] = useState(source);

  useEffect(() => {
    const updateData = () => {
      const updatedValues = source.map((item) => item.value);
      setData(
        source.map((item, index) => ({ ...item, value: updatedValues[index] }))
      );
    };

    const width = window.innerWidth < 768 ? 320 : 540;
    const height = data.length * 40;
    const maxValue = d3.max(data, (d) => d.value);
    const fontSize = window.innerWidth < 768 ? "5px" : "14px";

    d3.select("#funnel").select("svg").remove();
    const svg = d3
      .select("#funnel")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const groups = svg
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0, ${i * 40})`);

    groups
      .append("rect")
      .attr("x", (d) => (width - (d.value / maxValue) * (width - 250)) / 2)
      .attr("width", (d) => (d.value / maxValue) * (width - 250))
      .attr("height", 30)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

    groups
      .append("text")
      .attr(
        "x",
        (d) =>
          (width - (d.value / maxValue) * (width - 250)) / 2 +
          ((d.value / maxValue) * (width - 250)) / 2
      )
      .attr("y", 20)
      .attr("font-size", fontSize)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text((d) => d.value);

    groups
      .append("text")
      .attr("x", 10)
      .attr("y", 20)
      .attr("font-size", fontSize === "5px" ? "5px" : "12px")
      .attr("fill", "#000")
      .text((d) => d.source);
  }, [data]);

  return (
    <section>
      <div className="w-full max-w-lg justify-center h-96">
        <h2 className="text-lg font-semibold text-center mb-5">
          Recruitment Stage Conversion Rate
        </h2>
        <div id="funnel" />
      </div>
    </section>
  );
}
