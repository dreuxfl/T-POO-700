<template>

  <bar-chart :bar_data=all_bar_data />
</template>

<script>
import BarChart from "@/components/Charts/BarChart";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import ChartsManagerService from "@/service/ChartsManagerService";
import moment from "moment";

export default {
  name: "CharmManager",
  components: {
    BarChart,

  },
  props: {
    userId: Number
  },
 setup(props){
   let bar_days = [];
   let bar_usersclockedin = [];
   let bar_users_shouldbe_working = [];
   let line_days = [];
   let line_usersclockedin = [];
   let line_users_shouldbe_working = [];
   var pie_hours_worked;
   var pie_hours_left;
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
         if (response.data.data.length > 0) {
           pie_hours_left = response.data.data.workingtime
           pie_hours_worked = response.data.data.hoursclocked
         }
       }
   );
   return {
     all_bar_data: [bar_days, bar_users_shouldbe_working, bar_usersclockedin],
     all_line_data: [line_days, line_users_shouldbe_working, line_usersclockedin],
     pie_workingtime: pie_hours_left,
     pie_clockin: pie_hours_worked,
   }

 }
}


</script>

<style scoped>

</style>