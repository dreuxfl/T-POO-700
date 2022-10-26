<template>
  <h1>
    Clock Pointer
  </h1>
  <div class="q-pa-md q-gutter-sm">
    <q-btn v-if="clockIn" v-on:click=clock() round color="positive"  label="Clock In" id="clockinBtn"/>
    <q-btn v-else v-on:click=clock() round color="negative" label="Clock Out" id="clockinBtn"/>
  </div>

  <p>Last Clock In : {{ new Date (Date.now())}}</p>

  <div>
    <p>Time Clocked In:
      <span>{{time_clockedIn.days}}</span>:<span>{{time_clockedIn.hours}}</span>:<span>{{time_clockedIn.minutes}}</span>:<span>{{time_clockedIn.seconds}}</span>

    </p>
  </div>
</template>

<style scoped>
#clockinBtn{
  width: 100px;
  height: 100px;
  align-content: center;
}

</style>

<script >

import { useStopwatch } from 'vue-timer-hook';
const stopwatch = useStopwatch(false, false);

export default {
  name: "ClockWork",
  data() {
    return{
      time_clockedIn: stopwatch,
      clockIn: true, //intialiser avec la valeur du status
    }
  },
  methods: {
    clock(){
      this.clockIn = !this.clockIn;
      if(!this.clockIn) this.time_clockedIn.start();
      else this.time_clockedIn.pause();
    }
  },
  props:{
    startDateTime: Date,
  }
}
</script>

