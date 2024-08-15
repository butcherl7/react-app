import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { UniversalTransition } from "echarts/features";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

export { echarts };
