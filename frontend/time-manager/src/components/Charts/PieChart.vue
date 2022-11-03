<template>
  <div class="q-pa-md">
    <q-card class="my-card margin" style="padding:2em">
  <Pie
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :plugins="plugins"
      :dataset-id-key="datasetIdKey"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
  />
    </q-card>
  </div>
</template>

<script>
import { defineComponent, h, PropType } from 'vue'

import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    pie_data : Array,
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
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
  setup(props) {
    let hours_left = {...props.pie_data}[0] - {...props.pie_data}[1];
    let hours_worked = {...props.pie_data}[1];
    return{
      chartData: {
        labels: ['Work Hours Left', 'Hours Clocked'],
        datasets: [
          {
            backgroundColor: ['#E46651', '#00D8FF'],
            data: [hours_left, hours_worked]
          }
        ]
      },

      chartOptions: {
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