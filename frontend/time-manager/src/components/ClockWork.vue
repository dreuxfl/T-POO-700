<template >
  <div class="q-pa-md">
    <q-card class="my-card margin" style="padding:1em">
      <q-card-section>
        <div class="text-h6 text-center"> Clock Pointer </div>
      </q-card-section>
      <q-card-section class="row justify-center">
        
          <q-btn v-if="IsClockIn" v-on:click=clock() round color="positive"  label="Clock In" id="IsClockInBtn"/>
          <q-btn v-else v-on:click=clock() round color="negative" label="Clock Out" id="IsClockInBtn"/>
      </q-card-section>

      <q-card-section class="text-center">
        <p  v-if="lastClockTime === null">You never clocked in <strong>today</strong></p>
        <p  v-else>Last Clock In : {{ lastClockTime }}</p>


        <p>Time Clocked In: <strong>{{time_clockedIn.hours + time_clockedIn.days*24}} hours, {{time_clockedIn.minutes}} minutes, {{time_clockedIn.seconds}} seconds</strong></p>
      </q-card-section>
      
    </q-card>
  </div>
 
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
  import { useQuasar } from 'quasar';

  const stopwatch = useStopwatch(false, false);

  export default {
    name: "ClockWork",

    setup () {
      const $q = useQuasar();
    },
    data() {
      return{
        lastClockTime: null,
        time_clockedIn: stopwatch,
        IsClockIn: true, //intialiser avec la valeur du status
      }
    },
    methods: {
      async confirmClockoutDialog () { //https://forum.quasar-framework.org/topic/6438/await-dialogs-mixin
        return new Promise(resolve => {
          this.$q.dialog({
            title: '<div class="text-h6">Confirm clock out</div>',
            message: `
              <p>Are you sure you want to clock out ?</p>
              <p>Clock duration is <strong>${this.time_clockedIn.hours + this.time_clockedIn.days*24} hours, ${this.time_clockedIn.minutes} minutes, ${this.time_clockedIn.seconds} seconds</strong></p>`,
            cancel: true,
            html: true,
            persistent: true,
          })
            .onOk(() => resolve(true))
            .onCancel(() => resolve(false))
        })
      },
      clock(){
        
        let now = Date.now();

        if(this.IsClockIn) {
          this.time_clockedIn.start();

          this.lastClockTime = moment(new Date (now)).format("YYYY-MM-DD HH:mm:ss");
          ClockService.postClock(this.userId, this.IsClockIn, moment(new Date (now)).format("YYYY-MM-DD HH:mm:ss"));
          this.IsClockIn = !this.IsClockIn;
        }

        else {
          this.time_clockedIn.pause();
          this.confirmClockoutDialog().then(isConfirmed => {

            if(isConfirmed){
              this.lastClockTime = moment(new Date (now)).format("YYYY-MM-DD HH:mm:ss");
              ClockService.postClock(this.userId, this.IsClockIn, moment(new Date (now)).format("YYYY-MM-DD HH:mm:ss"));
              this.IsClockIn = !this.IsClockIn;
            } 
            else this.time_clockedIn.start();
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
        let lastClockStatus = false;
        console.log(response.data.data)

        if(response.data.data.length > 0){
          response.data.data.forEach(clock => {
            if(clock.status) totalClockDuration -= new Date(clock.time).getTime();
            else totalClockDuration += new Date(clock.time).getTime();
          })

          lastClockStatus= response.data.data.at(-1).status;
        }

        if(lastClockStatus) totalClockDuration += (Date.now());

        this.IsClockIn = !lastClockStatus  //le statut du bouton doit être l'opposé 
        this.time_clockedIn = useStopwatch(totalClockDuration/1000, lastClockStatus); //de la dernière valeur de la bdd

        // if(response.data.data.length > 0){

        //   this.lastClockTime = moment(new Date (lastStatus.time)).format("YYYY-MM-DD HH:mm:ss");
        //   this.IsClockIn = !lastClock.status;
        //   console.log(new Date(lastClock.time).getTime());

        //   if(this.IsClockIn) this.time_clockedIn = useStopwatch((new Date(lastClock.time).getTime() - new Date(beforeLast.time).getTime())/1000, false);
        //   else this.time_clockedIn = useStopwatch((Date.now() - new Date(lastClock.time).getTime())/1000, true);
        //     console.log(this.time_clockedIn.minutes);
        // } 
      });

    }

  }
</script>
