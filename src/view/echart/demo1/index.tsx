import { echarts } from "@/common/echarts";
import { useEffect, useRef } from "react";

const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

export default function Demo1() {
  const myChart = useRef<echarts.ECharts>();

  useEffect(() => {
    if (myChart.current) {
      myChart.current.setOption(option);
    }
  }, []);

  return (
    <section
      style={{ width: 500, height: 300, border: "1px solid black" }}
      ref={(dom) => !myChart.current && (myChart.current = echarts.init(dom))}
    ></section>
  );
}
