<template>
  <bar-chart :days= label_data :userclockedin=userCI_data :usersshouldwork=userShouldWork_data>

  </bar-chart>
</template>

<script>
import BarChart from "@/components/Charts/BarChart";
import ChartsManagerService from "@/service/ChartsManagerService";
import moment from "moment";

let days = []
let usersclockedin = []
let users_shouldbe_working = []
ChartsManagerService.getBarChart().then((response) => {
      if(response.data.data.length > 0){
        for (let i = 0; i < response.data.data.length; i++) {
          days.push(moment(response.data.data[i].day).format("ddd"))
          usersclockedin.push(response.data.data[i].usersthatclockedin)
          users_shouldbe_working.push(response.data.data[i].userworkingtime)
        }
      }
    }
);

export default {
  name: "CharmManager",
  components: {
    BarChart
  },
  data(){
    return {
      label_data: days,
      userCI_data: usersclockedin,
      userShouldWork_data: users_shouldbe_working
    }

  }
}

</script>

<style scoped>

</style>