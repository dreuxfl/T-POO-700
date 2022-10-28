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
              <q-item-label>Chart 1</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Chart 2</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Chart 3</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </q-btn-dropdown>

        <q-space />

        <q-btn color="primary" icon-right="person" label="Sign in" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated class="flex justify-center">
      <UserLogin @create-user-event="setUserId"/>
    </q-drawer>

    <q-page-container class="flex justify-center align-center " style="margin-top: 5em;">

      <q-btn v-if="userId === null" color="primary" icon-right="person" label="Sign in" @click="toggleRightDrawer" />
        
      <div v-else class="q-a-md row items-start q-gutter-md justify-center align-center ">
        <clock-work :userId=this.userId />
        <working-time/>
        <working-times/>
      </div>
      
    </q-page-container>
  </q-layout>
</template>

<script>
  import { ref } from 'vue'

  import ClockWork from "./components/ClockWork";
  import WorkingTime from "./components/WorkingTime";
  import WorkingTimes from "./components/WorkingTimes";
  import UserLogin from "./components/User.vue";

  export default {
    name: 'LayoutDefault',

    components: {
      ClockWork,
      WorkingTime,
      WorkingTimes,
      UserLogin
    },

    methods:{
      setUserId(payload){
          this.userId = payload.id;
          console.log(this.userId);
      },
        toggleRightDrawer() {
          
        this.rightDrawerOpen = !this.rightDrawerOpen;
      },
    },
    data() {
      return {
        rightDrawerOpen : ref(false),
        userId: null,
      }
    }
  }
</script>
