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
      <User @user-create-event="userChanged"  @user-login-event="userChanged"/>
    </q-drawer>

    <q-page-container class="flex justify-center align-center " style="margin-top: 3em;">

      <q-btn v-if="userId == null" color="primary" icon-right="person" label="Sign in" @click="toggleProfileDrawer" />
        
      <div v-else class="q-a-md row items-start q-gutter-md justify-center align-center">
        <users-list :key="this.userListKey" @user-select-event="setSelectedUserId" @rerender-user-list-event="rerenderUserList" />
        <clock-work :userId=this.userId />
        <working-times :key="this.workingTimesKey" :selectedUserId=this.selectedUserId />
        <chart-manager v-if="this.selectedUserId != null" :key="this.chartManagerKey" :userId=this.selectedUserId :chartId=this.chartId />
        <chart-manager v-else :key="this.chartManagerKey" :userId=this.userId :chartId=this.chartId />
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
        this.userId = payload.id;
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
      }
    }
  }
</script>
