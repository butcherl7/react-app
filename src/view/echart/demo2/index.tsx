import { useRef, useState } from "react";
import { Button, Modal, Switch, Space } from "antd";

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

export default function Demo2() {
  const myChart = useRef<echarts.ECharts>();
  const chartDOM = useRef<HTMLDivElement>(null);
  const [autoClear, setAutoClear] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideModal = () => setIsModalOpen(false);

  const afterOpenChange = (open: boolean) => {
    if (!open) return;
    if (!myChart.current) myChart.current = echarts.init(chartDOM.current);

    const length = option.series[0].data.length;
    option.series[0].data = new Array(length).fill(0).map(() => Math.round(Math.random() * 100) + 100);

    autoClear && myChart.current.clear();
    myChart.current.setOption(option);
  };

  return (
    <section>
      <Space>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>
        <Switch
          checkedChildren="Clear On"
          unCheckedChildren="Clear Off"
          defaultChecked={autoClear}
          onChange={(state) => setAutoClear(state)}
        ></Switch>
      </Space>
      <Modal
        title="Chart Modal"
        maskClosable={false}
        open={isModalOpen}
        onOk={hideModal}
        onCancel={hideModal}
        afterOpenChange={afterOpenChange}
      >
        <div style={{ height: 300, border: "1px solid black" }} ref={chartDOM}></div>
      </Modal>
    </section>
  );
}
