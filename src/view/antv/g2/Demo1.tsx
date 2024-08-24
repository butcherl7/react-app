import { Chart } from "@antv/g2";
import { Card } from "antd";
import { useEffect, useRef } from "react";

export default function Demo1() {
  const myChart = useRef<Chart>();

  useEffect(() => {
    if (myChart.current) {
      myChart.current.data([
        { week: "Mon", value: 150 },
        { week: "Tue", value: 230 },
        { week: "Wed", value: 224 },
        { week: "Thu", value: 218 },
        { week: "Fri", value: 135 },
        { week: "Sat", value: 147 },
        { week: "Sun", value: 260 },
      ]);
      myChart.current.render();
    }
  }, []);

  return (
    <section
      style={{ width: 500, height: 300, border: "1px solid rgb(240, 240, 240)" }}
      ref={(dom) => !myChart.current && (myChart.current = createChart(dom!))}
    ></section>
  );
}

function createChart(container: HTMLElement) {
  return new Chart({
    container,
    type: "view",
    autoFit: true,
    // @ts-ignore
    encode: { x: "week", y: "value" },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    children: [
      { type: "line", labels: [{ text: "value", style: { dx: -10, dy: -12 } }] },
      { type: "point", style: { fill: "white" }, tooltip: false },
    ],
  });
}
