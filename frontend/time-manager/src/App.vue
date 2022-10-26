<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">

    </q-header>


    <q-page-container>
      <clock-work/>
      <working-time/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

import ClockWork from "./components/ClockWork";
import WorkingTime from "./components/WorkingTime";

export default {
  name: 'LayoutDefault',

  components: {
    ClockWork,
    WorkingTime
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
