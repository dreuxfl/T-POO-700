<template>
  <q-layout view="lHh Lpr lFf">
    <UserLogin/>

    <q-page-container>
      <bar-chart/>
      <line-chart/>
      <pie-chart/>
      <div class="q-a-md row items-start q-gutter-md justify-center align-center ">
        <clock-work userId=1 />
        <UsersList/>
        <working-times/>

      </div>

    </q-page-container>
  </q-layout>
</template>

<script>
  import { ref } from 'vue'

  import ClockWork from "./components/ClockWork";
  import UsersList from "./components/UsersList";
  import WorkingTimes from "./components/WorkingTimes";
  import UserLogin from "./components/UserLogin.vue";
  import BarChart from "@/components/Charts/BarChart";
  import LineChart from "@/components/Charts/LineChart";
  import PieChart from "@/components/Charts/PieChart";


  export default {
    name: 'LayoutDefault',

    components: {
      LineChart,
      BarChart,
      ClockWork,
      UsersList,
      WorkingTimes,
      UserLogin,
      PieChart
    },

    setup () {
      return {
        leftDrawerOpen: ref(false)
      }
    }
  }
</script>
