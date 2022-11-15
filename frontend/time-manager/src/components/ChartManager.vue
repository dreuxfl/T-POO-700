<template>
  <pie-chart v-if='this.chartId === 1 && pie_datas !== null'  :pie_data=pie_datas 
      :primaryColor=this.primaryColor :secondaryColor=this.secondaryColor />

  <line-chart v-if='this.chartId === 2 && all_line_data !== null' :line_data=all_line_data 
    :primaryColor=this.primaryColor :secondaryColor=this.secondaryColor />

  <bar-chart v-if='this.chartId === 3 && all_bar_data !== null'  :bar_data=all_bar_data 
    :primaryColor=this.primaryColor :secondaryColor=this.secondaryColor />

    
</template>

<script>
import BarChart from "@/components/Charts/BarChart";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import ChartsManagerService from "@/service/ChartsManagerService";
import moment from "moment";
import { useQuasar } from 'quasar';

export default {
  name: "ChartManager",
  components: {
    PieChart,
    BarChart,
    LineChart,
  },
  props: {
    userId: Number,
    chartId: Number
  },
  setup () {
    const $q = useQuasar()

    return {
      showNotif (positive, message) {
        $q.notify({
          color: (positive ? "positive" : "negative"),
          textColor: 'white',
          icon: (positive ? "cloud_done" : "warning"),
          message: message
        })
      }
    }
  },
  methods: {
    async getPieChartData(){
      ChartsManagerService.getPieChart(this.token, this.userId).then((response) => {
          this.pie_datas = [response.data.data.hoursclocked, response.data.data.workingtime]
        }
      ).catch(e => {
        console.log(e);
        this.showNotif(false, 'Pie data fetch failed')
      });
    }, 

    async getLineChartData(){
      ChartsManagerService.getLineChart(this.token, this.userId).then((response) => {
        if (response.data.data.length > 0) {
          this.line_usersclockedin = []
          this.line_days = []
          this.line_users_shouldbe_working = []
          for (let i = 0; i < response.data.data.length; i++) {
            this.line_days.push(moment(response.data.data[i].day).format("ddd"))
            this.line_usersclockedin.push(response.data.data[i].hoursclocked)
            this.line_users_shouldbe_working.push(response.data.data[i].workingtime)
          }
          this.all_line_data = [this.line_days, this.line_users_shouldbe_working, this.line_usersclockedin]
        }
      }).catch(e => {
        console.log(e);
        this.showNotif(false, 'Line data fetch failed')
      });
    },

    async getBarChartData(){
      ChartsManagerService.getBarChart(this.token).then((response) => {
        if (response.data.data.length > 0) {
          this.bar_days = [];
          this.bar_usersclockedin = [];
          this.bar_users_shouldbe_working = [];
          for (let i = 0; i < response.data.data.length; i++) {
            this.bar_days.push(moment(response.data.data[i].day).format("ddd"));
            this.bar_usersclockedin.push(response.data.data[i].usersthatclockedin);
            this.bar_users_shouldbe_working.push(response.data.data[i].userworkingtime);
          }

          this.all_bar_data = [this.bar_days, this.bar_users_shouldbe_working, this.bar_usersclockedin];
        }
      }).catch(e => {
        console.log(e);
        this.showNotif(false, 'Bar data fetch failed');
      });
    }
  },
  data(){
   return {
      token: null,
      primaryColor: "#21BA45",
      secondaryColor: "#7862A8",
      all_bar_data: null,
      all_line_data: null,
      bar_days : null,
      bar_usersclockedin : null,
      bar_users_shouldbe_working : null,
      line_days : null,
      line_usersclockedin : null,
      line_users_shouldbe_working : null,
      pie_datas : null,
   }
 },
 created(){
  this.token = localStorage.getItem('access_token');
  switch (this.chartId) {
    case 1:
      this.getPieChartData(this.userId);
      break;
    case 2:
      this.getLineChartData(this.userId);
      break;
    case 3:
      this.getBarChartData();
      break;
    default:
      break;
  }
 }
}
</script>

<style scoped>

</style>