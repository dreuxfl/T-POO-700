<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="row justify-between">
        <q-toolbar-title>
          <q-avatar>
            <img src=".\assets\Logo_Team.png">
          </q-avatar>
          Clock'O'Rico !
        </q-toolbar-title>

        <div v-if="!loading && token != null" class="q-gutter-x-md" >
          <q-btn :disabled="this.selectedUserId === null || this.chartId===this.ChartType.Pie" 
            color="primary" icon-right="pie_chart" label="Pie Chart" @click="setchartId(this.ChartType.Pie)" />
          <q-btn :disabled="this.selectedUserId === null || this.chartId===this.ChartType.Line" 
            color="primary" icon-right="ssid_chart" label="Line Chart" @click="setchartId(this.ChartType.Line)" />
          <q-btn :disabled="this.selectedUserId === null || this.chartId===this.ChartType.Bar" 
            color="primary" icon-right="bar_chart" label="Bar Chart" @click="setchartId(this.ChartType.Bar)" />

          <q-tooltip v-if="this.selectedUserId === null" 
            transition-show="rotate" transition-hide="rotate"
            class="text-body2 bg-negative" 
          > 
            Select user first 
          </q-tooltip>
        </div>
        
        <q-space />
        
        <q-btn color="primary" icon-right="person" label="Profile" @click="toggleProfileDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated class="flex justify-center">
      <User 
        @userLoginEvent="userChanged" @userLogoutEvent="userLogout"
        @userRequestLoadingEvent="onRequestLoading" @userRequestFailedEvent="onRequestFailed"
      />
    </q-drawer>

    <q-page-container class="flex justify-center align-center " style="margin: 3em;">

      <div v-if="loading" style="text-align: center">
        <div class="text-h2 text-primary" >Clockorico !</div>
        <div class="text-overline text-secondary">loading...</div>
        <img src="@/assets/poulet.gif" alt="Poulet" width="200" height="200" class="rotating"  >
      </div>
      <q-btn v-else-if="token == null" color="primary" icon-right="person" label="Sign in" @click="toggleProfileDrawer" />
      
      <div v-else class="q-a-md row items-start q-gutter-md justify-center align-center">
        <users-list :key="this.userListKey" @userSelectEvent="setSelectedUserId" @userListChangedEvent="onUserListChanged" />
        <clock-work :userId=this.userId @clock-event="onClock"/>
        <working-times :key="this.workingTimesKey" :selectedUserId=this.selectedUserId @workingTimesChangedEvent="onWorkingTimesChanged"/>
        <chart-manager v-if="this.selectedUserId != null" :key="this.chartManagerKey + '-if'" 
          :userId=this.selectedUserId :chartId=this.chartId />
        <chart-manager v-else-if="this.userId != null" :key="this.chartManagerKey + '-else'" 
          :userId=this.userId :chartId=this.ChartType.Pie />
      </div>

    </q-page-container>
  </q-layout>
</template>

<script>

  import { ref } from 'vue'
  import ClockWork from "./components/ClockWork";
  import User from "./components/User";
  import WorkingTimes from "./components/WorkingTimes";
  import ChartManager from "@/components/ChartManager";
  import UsersList from "@/components/UsersList";
  import jwt_decode from "jwt-decode";

    const ChartType = {
      Pie : 1,
      Line : 2,
      Bar : 3,
    }
  export default {
    name: 'LayoutDefault',

    components: {
      UsersList,
      ChartManager,
      ClockWork,
      User,
      WorkingTimes
    },

    methods:{
      onRequestLoading(){
        this.loading = true;
        this.rightDrawerOpen = false;  
      },
      onRequestFailed(){
        this.loading = false;
        this.rightDrawerOpen = true;
      },
      toggleProfileDrawer() {
        this.rightDrawerOpen = !this.rightDrawerOpen;
      },

      // rerender events
      rerenderUserList(){ 
        this.userListRenderCount++;
        this.userListKey = `user-list-${this.userListRenderCount}`; 
      },
      rerenderWorkingTimes(){ 
        this.workingTimesRenderCount++;
        this.workingTimesKey = `working-times-${this.workingTimesRenderCount}`; 
      },
      rerenderChartManager(){ 
        this.chartManagerRenderCount++;
        this.chartManagerKey = `chart-manager-${this.chartManagerRenderCount}`; 
      },
      userChanged(payload){
        
        this.token = payload.token;
        this.loading = false;
        localStorage.setItem('access_token', this.token);
        this.userId = parseInt(jwt_decode(this.token).sub);
        //this.isAdmin = jwt_decode(this.token).quelquechose
        
        this.rerenderUserList();
        this.rerenderWorkingTimes();
        this.rerenderChartManager();
      },
      onWorkingTimesChanged(){
        this.rerenderWorkingTimes();
        this.rerenderChartManager();
      },
      onUserListChanged(){
        this.rerenderUserList();
      },
      onClock(){
        this.rerenderChartManager();
      },
      userLogout(){
        localStorage.removeItem('token');
        this.token = null
        this.userId = null;
        this.selectedUserId = null
        this.rerenderUserList();
        this.rerenderWorkingTimes();
        this.rerenderChartManager();
      },
      setSelectedUserId(payload){
        this.selectedUserId = payload.id;
        this.rerenderWorkingTimes();
        this.rerenderChartManager();
      },
      setchartId(chart){
        this.chartId = chart;
        this.rerenderChartManager();
      }
    },
    data() {
      return {
        token: null,
        userId: null,
        chartId: 0,
        selectedUserId: null,
        loading: false,

        userListRenderCount: 0,
        workingTimesRenderCount: 0,
        chartManagerRenderCount: 0,
        userListKey: "user-list-0",
        workingTimesKey: "working-times-key-0",
        chartManagerKey: "chart-manager-0",
        rightDrawerOpen : ref(false),
        
        ChartType
      }
    }
  }
</script>

<style scoped>
@keyframes rotating
    {
    from
        {
        transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        }
    to
        {
        transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        }
    }
@-webkit-keyframes rotating
    {
    from
        {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        }
    to
        {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        }
    }
.rotating
    {
      transform-origin: bottom center;
      -webkit-animation: rotating 3s linear infinite;
      -moz-animation: rotating 3s linear infinite;
      -ms-animation: rotating 3s linear infinite;
      -o-animation: rotating 3s linear infinite;
      animation: rotating 3s linear infinite;
    }
</style>
