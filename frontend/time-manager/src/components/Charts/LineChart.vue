<template>
  <div class="q-pa-md">
    <q-card class="my-card margin" style="padding:2em">
      <Line
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
      />
    </q-card>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
    LineController,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    LineController
)


export default defineComponent({
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 250
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {

      chartData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [9, 8, 10, 7, 8, 11, 8],
          label: "Work Hours",
          backgroundColor: '#027BE3', lineTension: 0.4,
          borderWidth: 2,
          borderColor: '#027BE3',
        },
          {
            data: [8, 8, 11, 9, 8, 10, 10],
            label: "Hours Clocked",
            borderWidth: 2,
            borderColor: '#f87979',
            backgroundColor: '#f87979', lineTension: 0.4
          }]
      },

      chartOptions :{
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
})


</script>

<style scoped>
.q-pa-md{
  width: 50%;
  height: 50%;
}
</style>