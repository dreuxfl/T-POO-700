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
import { defineComponent} from 'vue'

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
    line_data: Array,
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
    primaryColor: String,
    secondaryColor: String,
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

  setup(props){
    let days = Object.assign([], Object.assign([],{...props.line_data})[0]);
    let workinghours = Object.assign([], Object.assign([],{...props.line_data})[1]);
    let clocked = Object.assign([], Object.assign([],{...props.line_data})[2]);
    return {
      chartData: {
        labels: days,
        datasets: [{
          data: workinghours,
          label: "Work Hours",
          backgroundColor: props.secondaryColor, lineTension: 0.4,
          borderWidth: 2,
          borderColor: props.secondaryColor,
        },
          {
            data: clocked,
            label: "Hours Clocked",
            borderWidth: 2,
            borderColor: props.primaryColor,
            backgroundColor: props.primaryColor, lineTension: 0.4
          }]
      },

      chartOptions :{
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

})

</script>

<style scoped>
.q-pa-md{
  width: 50%;
  height: 50%;
}
</style>