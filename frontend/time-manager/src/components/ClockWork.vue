<template>
  <div>
  <h2>
    Clock Manager
  </h2>
  <div class="q-pa-md q-gutter-sm">
    <q-btn v-if="clockIn" v-on:click=clock() round color="positive"  label="Clock In" id="clockinBtn"/>
    <q-btn v-else v-on:click=clock() round color="negative" label="Clock Out" id="clockinBtn"/>
  </div>

  <p>Last Clock In : {{ startDateTime }}</p>

  <div>
    <p>Time Clocked In:
      <span>{{time_clockedIn.hours}}</span>h<span>{{time_clockedIn.minutes}}</span>m<span>{{time_clockedIn.seconds}}</span>s
    </p>
  </div>
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
import moment from "moment";
const stopwatch = useStopwatch(false, false);

export default {
  name: "ClockWork",
  data() {
    return{
      startDateTime: moment(new Date (Date.now())).format("DD/MM/YYYY, h:mm:ss"),
      time_clockedIn: stopwatch,
      clockIn: true, //intialiser avec la valeur du status
    }
  },
  methods: {
    clock(){
      this.clockIn = !this.clockIn;
      if(!this.clockIn)
        this.time_clockedIn.start();
      else
        this.time_clockedIn.pause();
      this.startDateTime = moment(new Date (Date.now())).format("DD/MM/YYYY, h:mm:ss");
    }
  },

}
</script>

