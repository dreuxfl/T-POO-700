<template>
  <q-card class="my-card margin" style="padding:1em">
    <q-card-section>
      <div class="text-h6 text-center"> Clock Pointer </div>
    </q-card-section>
    <q-card-section class="row justify-center">
      
        <q-btn v-if="IsClockIn" v-on:click=clock() round color="positive"  label="Clock In" id="IsClockInBtn"/>
        <q-btn v-else v-on:click=clock() round color="negative" label="Clock Out" id="IsClockInBtn"/>
    </q-card-section>

    <q-card-section class="text-center">
      <p>Last Clock In : {{ startDateTime }}</p>

      <p>Time Clocked In: {{time_clockedIn.hours}} hours, {{time_clockedIn.minutes}} minutes, {{time_clockedIn.seconds}} seconds</p>
    </q-card-section>
    
  </q-card>
</template>

<style scoped>

  #IsClockInBtn{
    width: 100px;
    height: 100px;
    align-content: center;
  }
  q-card-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>

<script >

  import { useStopwatch } from 'vue-timer-hook';
  import moment from "moment";
  import ClockService from "../service/ClockService";

  const stopwatch = useStopwatch(false, false);

  export default {
    name: "ClockWork",
    data() {
      return{
        startDateTime: moment(new Date (Date.now())).format("YYYY-MM-DD HH:mm:ss"),
        time_clockedIn: stopwatch,
        IsClockIn: null, //intialiser avec la valeur du status

      }
    },
    methods: {
      clock(){

        let now = Date.now();
        this.startDateTime = moment(new Date (now)).format("YYYY-MM-DD HH:mm:ss");
        ClockService.postClock(this.userId, this.IsClockIn, moment(new Date (now)).format("YYYY-MM-DD HH:mm:ss"));
        
        if(this.IsClockIn)
          this.time_clockedIn.start();
        else
          this.time_clockedIn.pause();
          
        this.IsClockIn = !this.IsClockIn;
      }
    },
    props: {
      userId : Number
    },
    created: function () {
    // `this` points to the vm instance
      ClockService.getClocks(this.userId).then((response) => {
        let lastClock = response.data.data.pop();
        let beforeLast = response.data.data.pop();

        this.startDateTime = moment(new Date (lastClock.time)).format("YYYY-MM-DD HH:mm:ss");
        this.IsClockIn = !lastClock.status;
        console.log(new Date(lastClock.time).getTime());

        if(this.IsClockIn) this.time_clockedIn = useStopwatch((new Date(lastClock.time).getTime() - new Date(beforeLast.time).getTime())/1000, false);
        else this.time_clockedIn = useStopwatch((Date.now() - new Date(lastClock.time).getTime())/1000, true);
          console.log(this.time_clockedIn.minutes);
      });

    }

  }
</script>
