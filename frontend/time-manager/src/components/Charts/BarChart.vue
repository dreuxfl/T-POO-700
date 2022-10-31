<template>
<div class="q-pa-md">
  <q-card class="my-card margin" style="padding:1em">
  <Bar
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
import { Bar} from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },

  props: {
    bar_data: Array,
    chartId: {
      type: String,
      default: 'bar-chart'
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
  setup(props){
    let days = Object.assign([], Object.assign([],{...props.bar_data})[0]);
    let workinghours = Object.assign([], Object.assign([],{...props.bar_data})[1]);
    let clocked = Object.assign([], Object.assign([],{...props.bar_data})[2]);
    return {
      chartData: {
        labels: days,
        datasets: [ { data: clocked,
          label: "Employees that clocked in", backgroundColor: '#027BE3'},
          {data: workinghours,
            label: "Employees that should work", backgroundColor: '#f87979'} ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>

<style scoped>
.q-pa-md{
  width: 50%;
  height: 50%;
}
</style>