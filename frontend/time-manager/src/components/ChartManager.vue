<template>
  <bar-chart :days= bar_label_data :userclockedin=bar_userCI_data :usersshouldwork=bar_userShouldWork_data />
  <line-chart :days=line_label_data :usersshouldwork=line_workinghours :hoursclocked-in=line_clockin />
  <PieChart :hoursclockedIn=pie_clockin :workingtime=pie_workingtime />
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
    LineChart,
    BarChart,
    PieChart
  },
  props:{
    userId : Number
  },
  data(){
    return {
      bar_label_data: bar_days,
      bar_userCI_data: bar_usersclockedin,
      bar_userShouldWork_data: bar_users_shouldbe_working,
      line_label_data: line_days,
      line_workinghours: line_users_shouldbe_working,
      line_clockin: line_usersclockedin,
      pie_workingtime: pie_hours_left,
      pie_clockin: pie_hours_worked
    }

  },
  created: function () {
    ChartsManagerService.getBarChart().then((response) => {
          if(response.data.data.length > 0){
            for (let i = 0; i < response.data.data.length; i++) {
              bar_days.push(moment(response.data.data[i].day).format("ddd"))
              bar_usersclockedin.push(response.data.data[i].usersthatclockedin)
              bar_users_shouldbe_working.push(response.data.data[i].userworkingtime)
            }
          }
        }
    );

    ChartsManagerService.getLineChart(this.userId).then((response) => {
          if(response.data.data.length > 0){
            for (let i = 0; i < response.data.data.length; i++) {
              line_days.push(moment(response.data.data[i].day).format("ddd"))
              line_usersclockedin.push(response.data.data[i].hoursclocked)
              line_users_shouldbe_working.push(response.data.data[i].workingtime)
            }
          }
        }
    );

    ChartsManagerService.getPieChart(this.userId).then((response) => {
          if(response.data.data.length > 0){
            for (let i = 0; i < response.data.data.length; i++) {
              pie_hours_left = response.data.data[i].workingtime
              pie_hours_worked = response.data.data[i].hoursclocked
            }
          }
        }
    );
  }

}

let bar_days = []
let bar_usersclockedin = []
let bar_users_shouldbe_working = []
let line_days = []
let line_usersclockedin = []
let line_users_shouldbe_working = []
var pie_hours_worked
var pie_hours_left


</script>

<style scoped>

</style>