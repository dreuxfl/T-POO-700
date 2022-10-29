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
    days : Array,
    userclockedin : Array,
    usersshouldwork : Array,
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
  data() {
    return {
      chartData: {
        labels: this.days,
        datasets: [ { data: this.userclockedin,
        label: "Employees that clocked in", backgroundColor: '#027BE3'},
          {data:this.usersshouldwork,
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