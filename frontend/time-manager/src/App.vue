<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Outil de pointage GROUPE 7
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <clock-work/>
      <working-time/>
      <WorkingTimesVue/>
    </q-page-container>
  </q-layout>
  <UserLogin/>
</template>

<script>
  import { ref } from 'vue'

  import ClockWork from "./components/ClockWork";
  import WorkingTime from "./components/WorkingTime";
  import UserLogin from './components/UserLogin.vue'
  import WorkingTimesVue from './components/WorkingTimes.vue'

  export default {
    name: 'LayoutDefault',

    components: {
      ClockWork,
      WorkingTime,
      WorkingTimesVue,
      UserLogin
    },

    setup () {
      return {
        leftDrawerOpen: ref(false)
      }
    }
  }
</script>
