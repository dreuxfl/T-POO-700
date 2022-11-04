<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="row justify-between">
        <q-toolbar-title>
          <q-avatar>
            <img src=".\assets\Logo_Team.png">
          </q-avatar>
          Clockorico !
        </q-toolbar-title>

        <q-btn-dropdown  color="primary" label="Select chart to display">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label @click="setchartId(1)">Pie Chart</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label @click="setchartId(2)"> Line Chart</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label @click="setchartId(3)">Bar Chart</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-space />
        
        <q-btn color="primary" icon-right="person" label="Profile" @click="toggleProfileDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated class="flex justify-center">
      <User 
        @user-create-event="userChanged" @user-login-event="userChanged" @user-logout-event="userLogout"
        @user-request-loading-event="onRequestLoading" @user-request-failed-event="onRequestFailed"
      />
    </q-drawer>

    <q-page-container class="flex justify-center align-center " style="margin-top: 3em;">

      <div v-if="loading" style="text-align: center">
        <img src="@/assets/poulet.gif" alt="Poulet" width="200" height="200" class="rotating">
        <div class="text-h2 text-primary" style="margin-top:220px;" >Clockorico !</div>
      </div>
      <q-btn v-else-if="userId == null" color="secondary" icon-right="person" label="Sign in" @click="toggleProfileDrawer" />
      
      <div v-else class="q-a-md row items-start q-gutter-md justify-center align-center">
        <users-list :key="this.userListKey" @user-select-event="setSelectedUserId" @rerender-user-list-event="rerenderUserList" />
        <clock-work :userId=this.userId />
        <working-times :key="this.workingTimesKey" :selectedUserId=this.selectedUserId @rerender-working-times-event="rerenderWorkingTimes"/>
        <chart-manager v-if="this.selectedUserId != null" :key="this.chartManagerKey + '-if'" :userId=this.selectedUserId :chartId=this.chartId />
        <chart-manager v-else :key="this.chartManagerKey + '-else'" :userId=this.userId :chartId=this.chartId />
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
        console.log(this.workingTimesRenderCount);
        this.workingTimesKey = `working-times-${this.workingTimesRenderCount}`; 
      },
      rerenderChartManager(){ 
        this.chartManagerRenderCount++;
        this.chartManagerKey = `chart-manager-${this.chartManagerRenderCount}`; 
      },
      userChanged(payload){
        this.loading = false;
        this.userId = payload.id;
        this.rerenderUserList();
        this.rerenderWorkingTimes();
        this.rerenderChartManager();
      },
      userLogout(){
        this.userId = null;
        this.selectedUserId = null
        this.rerenderUserList();
        this.rerenderWorkingTimes();
        this.rerenderChartManager();
      },    
      setSelectedUserId(payload){
        this.selectedUserId = payload.id;
        console.log(payload.id)
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
        userListRenderCount: 0,
        workingTimesRenderCount: 0,
        chartManagerRenderCount: 0,
        userListKey: "user-list-0",
        workingTimesKey: "working-times-key-0",
        chartManagerKey: "chart-manager-0",
        rightDrawerOpen : ref(false),
        userId: null,
        chartId: 0,
        selectedUserId: null,
        loading: false,
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
