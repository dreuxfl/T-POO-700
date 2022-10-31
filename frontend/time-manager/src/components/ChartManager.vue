<template>
    <line-chart v-if='this.chartID === 2' :line_data=all_line_data />
    <bar-chart v-if='this.chartID === 3'  :bar_data=all_bar_data />
    <pie-chart v-if='this.chartID === 1'  :pie_data=all_pie_data />
</template>

<script>
import BarChart from "@/components/Charts/BarChart";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import ChartsManagerService from "@/service/ChartsManagerService";
import moment from "moment";




let bar_days = [];
let bar_usersclockedin = [];
let bar_users_shouldbe_working = [];
let line_days = [];
let line_usersclockedin = [];
let line_users_shouldbe_working = [];
let pie_datas = [];


export default {
  name: "CharmManager",
  components: {
    PieChart,
    BarChart,
    LineChart,
  },
  props: {
    userId: Number,
    chartID: Number
  },

setup(props) {
   ChartsManagerService.getBarChart().then((response) => {
         if (response.data.data.length > 0) {
           for (let i = 0; i < response.data.data.length; i++) {
             bar_days.push(moment(response.data.data[i].day).format("ddd"))
             bar_usersclockedin.push(response.data.data[i].usersthatclockedin)
             bar_users_shouldbe_working.push(response.data.data[i].userworkingtime)
           }
         }
       }
   );

   ChartsManagerService.getLineChart(props.userId).then((response) => {

         if (response.data.data.length > 0) {
           for (let i = 0; i < response.data.data.length; i++) {
             line_days.push(moment(response.data.data[i].day).format("ddd"))
             line_usersclockedin.push(response.data.data[i].hoursclocked)
             line_users_shouldbe_working.push(response.data.data[i].workingtime)
           }
         }
       }
   );

   ChartsManagerService.getPieChart(props.userId).then((response) => {
     pie_datas.push(response.data.data.hoursclocked)
     pie_datas.push(response.data.data.workingtime)
       }
   );
 },
  data(){
   return {
     all_bar_data: [bar_days, bar_users_shouldbe_working, bar_usersclockedin],
     all_line_data: [line_days, line_users_shouldbe_working, line_usersclockedin],
     all_pie_data: pie_datas,
   }
 }
}
console.log(pie_datas);
console.log([line_days, line_users_shouldbe_working, line_usersclockedin]);
</script>

<style scoped>

</style>