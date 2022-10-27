<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card margin" style="padding:1em">
      <q-card-section>
        <div class="text-h6">Mes temps du {{getFormattedDate(Date.now())}}</div>
      </q-card-section>
      <q-list class="dark bordered separator" v-for="(time, index) in myTimes" :key="index">
        <q-item clickable class="row items-start">
          <q-item-section avatar class="col-2">
            <q-icon name="alarm" color="primary" />
          </q-item-section>
          <q-item-section class="col-3">
            <q-item-label caption>Start</q-item-label>
            <q-item-label>{{ getFormattedDateTime(time.startTime) }}</q-item-label>
          </q-item-section>
          <q-item-section class="col-3">
            <q-item-label caption>End</q-item-label>
            <q-item-label>{{ getFormattedDateTime(time.endTime) }}</q-item-label>
          </q-item-section>
          <q-item-section class="col-3">
            <q-item-label caption>Duration</q-item-label>
            <q-item-label>{{ getFormattedDuration(time.startTime, time.endTime) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
  
  
</template>
  
<script>
  import moment from 'moment';
  export default {
    name: 'WorkingTimes',
    data() {
      return {
        myTimes: [
          {
            startTime: new Date("2022-10-26T09:00:00"),
            endTime: new Date("2022-10-26T09:05:00"),
          },
          {
            startTime: new Date("2022-10-26T09:00:00"),
            endTime: new Date("2022-10-26T21:00:00"),  
          },
          {
            startTime: new Date("2022-10-25T21:00:00"),
            endTime: new Date("2022-10-26T21:00:00"),          
          },
        ]
      }
    },
    methods: {
      getFormattedDate(date){
        return moment(date).format('DD/MM/YYYY')
      },
      getFormattedDateTime(date){
        return moment(date).format('DD/MM/YYYY, h:mm:ss')
      },
      getFormattedDuration(start, end){
        return moment.duration(end - start).humanize();
      }
    },
    props: {
      // myTimes: Array
    }
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    margin: 40px 0 0;
  }
  select {
    width: 40%
  }

</style>
