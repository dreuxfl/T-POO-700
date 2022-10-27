<template>
  <q-layout view="lHh Lpr lFf">
    <UserLogin/>

    <q-page-container>
      <router-view />
      <div class="q-a-md row items-start q-gutter-md justify-center align-center ">
        <clock-work userId=1 />
        <working-time/>
        <working-times/>
      </div>
      
    </q-page-container>
  </q-layout>
</template>

<script>
  import { ref } from 'vue'

  import ClockWork from "./components/ClockWork";
  import WorkingTime from "./components/WorkingTime";
  import WorkingTimes from "./components/WorkingTimes";
  import UserLogin from "./components/UserLogin.vue";

  export default {
    name: 'LayoutDefault',

    components: {
      ClockWork,
      WorkingTime,
      WorkingTimes,
      UserLogin
    },

    setup () {
      return {
        leftDrawerOpen: ref(false)
      }
    }
  }
</script>
