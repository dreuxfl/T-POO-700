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
      <div class="q-pa-md row items-start q-gutter-md">
        <clock-work userId=1 />
        <working-time/>
        <working-times/>
      </div>
      
    </q-page-container>
  </q-layout>
  <UserLogin/>
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
