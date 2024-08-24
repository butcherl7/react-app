import { useEffect, useRef } from "react";
import { SimpleCard } from "@/component";
import { echarts } from "@/common/echarts";

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
    <SimpleCard
      style={{ width: 500, height: 300 }}
      ref={(dom) => !myChart.current && (myChart.current = echarts.init(dom))}
    ></SimpleCard>
  );
}
