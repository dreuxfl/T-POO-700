<template >
  <div class="q-pa-md">
    <q-card v-if="userId" class="my-card margin" style="padding:1em">
      <q-card-section>
        <div class="text-h6 text-center"> Clock Pointer </div>
      </q-card-section>
      <q-card-section class="row justify-center">
          <q-btn v-if="isClockIn" v-on:click=clock() round color="positive"  label="Clock In" id="isClockInBtn"/>
          <q-btn v-else v-on:click=clock() round color="negative" label="Clock Out" id="isClockInBtn"/>
      </q-card-section>

      <q-card-section class="text-center">
        <p v-if="lastClock && lastClock.time">Last Clock {{lastClock.status ? "in" : "out"}} : {{ lastClock.time }}</p>
        <p v-else>You never clocked in <strong>today</strong></p>

        <p>Time Clocked In: <strong>{{timeClockedIn.hours + timeClockedIn.days*24}} hours, {{timeClockedIn.minutes}} minutes, {{timeClockedIn.seconds}} seconds</strong></p>
      </q-card-section>
      
    </q-card>
  </div>
 
</template>

<style scoped>

  #isClockInBtn{
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
  import { useQuasar } from 'quasar';

  const stopwatch = useStopwatch(false, false);

  export default {
    name: "ClockWork",

    setup () {
      const $q = useQuasar();
    },
    data() {
      return{
        lastClock: {
          time : null,
          status : false
        },
        timeClockedIn: stopwatch,
        isClockIn: true, //intialiser avec la valeur du status
      }
    },
    methods: {
      async confirmClockoutDialog () { //https://forum.quasar-framework.org/topic/6438/await-dialogs-mixin
        return new Promise(resolve => {
          this.$q.dialog({
            title: '<div class="text-h6">Confirm clock out</div>',
            message: `
              <p>Are you sure you want to clock out ?</p>
              <p>Clock duration is <strong>${this.timeClockedIn.hours + this.timeClockedIn.days*24} hours, ${this.timeClockedIn.minutes} minutes, ${this.timeClockedIn.seconds} seconds</strong></p>`,
            cancel: true,
            html: true,
            persistent: true,
          })
            .onOk(() => resolve(true))
            .onCancel(() => resolve(false))
        })
      },
      saveClock(clockTime){
        this.lastClock.time = moment(new Date (clockTime)).format("YYYY-MM-DD HH:mm:ss");
        this.lastClock.status = this.isClockIn;

        ClockService.postClock(this.userId, this.isClockIn, moment(new Date (clockTime)).format("YYYY-MM-DD HH:mm:ss"));
        this.isClockIn = !this.isClockIn;

        this.$emit("clock-event");
      },
      clock(){
        
        let now = Date.now();

        if(this.isClockIn) {
          this.timeClockedIn.start();
          this.saveClock(now)
        }

        else {
          this.timeClockedIn.pause();
          this.confirmClockoutDialog().then(isConfirmed => {

            if(isConfirmed) this.saveClock(now);

            else this.timeClockedIn.start();
          }) 
        }
      }
    },
    props: {
      userId : Number
    },
    created: function () {
      
      ClockService.getCurrentClocks(this.userId).then((response) => {
        let totalClockDuration = 0;
        let lastClock = null;
        this.isClockIn = true;
        let clocks = response.data.data
        if(clocks.length > 0){
          if(!clocks[0].status) clocks.shift();

          clocks.forEach(clock => {
            if(clock.status) totalClockDuration -= new Date(clock.time).getTime();
            else totalClockDuration += new Date(clock.time).getTime();
          });

          lastClock= clocks.at(-1);
        }
        if(lastClock){
          if(lastClock.status) totalClockDuration += (Date.now());

          this.isClockIn = !lastClock.status;  //le statut du bouton doit être l'opposé 
          this.lastClock.time = moment(new Date (lastClock.time)).format("YYYY-MM-DD HH:mm:ss");
          this.lastClock.status = lastClock.status;

          this.timeClockedIn = useStopwatch(totalClockDuration/1000, lastClock.status); //de la dernière valeur de la bdd
        } 
        
      });

    }

  }
</script>
