<template>
  <div class="q-pa-md">
    <q-card class="my-card margin" style="padding:2em">
  <Pie
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
import { defineComponent, h, PropType } from 'vue'

import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
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
  data() {
    return{
      chartData: {
        labels: ['Work Hours Left', 'Hours Clocked'],
        datasets: [
          {
            backgroundColor: ['#E46651', '#00D8FF'],
            data: [8, 9]
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