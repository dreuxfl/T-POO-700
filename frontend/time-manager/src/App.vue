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
              <q-item-label @click="setchartID(1)">Pie Chart</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label @click="setchartID(2)"> Line Chart</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label @click="setchartID(3)">Bar Chart</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </q-btn-dropdown>
        <q-space />
        <q-btn color="primary" icon-right="person" label="Profile" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated class="flex justify-center">
      <User @create-user-event="setUserId"  @user-login-event="setUserId"/>
    </q-drawer>

    <q-page-container class="flex justify-center align-center " style="margin-top: 3em;">

      <q-btn v-if="userId == null" color="primary" icon-right="person" label="Sign in" @click="toggleRightDrawer" />
        
      <div v-else class="q-a-md row items-start q-gutter-md justify-center align-center">
        <clock-work :userId=this.userId />
        <users-list/>
        <working-times/>
        <chart-manager :userId=this.userId :chartID=this.chartID />

      </div>

    </q-page-container>
  </q-layout>
</template>

<script>

  import Vue, { ref } from 'vue'
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
      setUserId(payload){
          this.userId = payload.id;
          console.log(this.userId);
      },
        toggleRightDrawer() {
        this.rightDrawerOpen = !this.rightDrawerOpen;
      },
      setchartID(chart){
        this.chartID = chart;
      }
    },
    data() {
      return {
        rightDrawerOpen : ref(false),
        userId: null,
        chartID: 0,
      }
    }

  }
</script>
