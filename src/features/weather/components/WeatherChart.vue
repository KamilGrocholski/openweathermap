<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';

import { formatDate } from "@/utils/format"

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
]);

export interface WeatherChartData {
    cityName: string;
    timeline: (Date | number)[],
    temperatures: number[],

};

const props = defineProps<{
    data: WeatherChartData;
}>();

const option = ref({
    title: {
        text: `Weather Forecast Chart`,
        left: "center"
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        show: false,
    },
    xAxis: {
        type: 'category',
        data: [""],
    },
    yAxis: [
        {
            type: 'value',
            name: 'Temperature (°C)',
            position: 'left',
        },
    ],
    series: [
        {
            name: 'Temperature',
            type: 'line',
            data: [1],
            yAxisIndex: 0,
        },
    ],
});

watch(
    () => props.data,
    (newData) => {
        option.value.xAxis.data = newData.timeline.map(self => formatDate(self));
        option.value.series[0].data = newData.temperatures;
    },
    { immediate: true }
);
</script>

<template>
    <v-chart class="chart" :option="option" autoresize />
</template>

<style scoped>
.chart {
    height: 40vh;
    width: 80vw;
}
</style>
