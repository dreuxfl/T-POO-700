<template>
  <q-layout view="hHh LpR ffr">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://www.manutan.fr/fstrz/r/s/www.manutan.fr/img/S/GRP/ST/AIG3946300.jpg?frz-v=67">
          </q-avatar>
          Interface de pointage
        </q-toolbar-title>
        <q-btn color="blue" icon-right="person" label="Sign in" @click="toggleRightDrawer" />
      </q-toolbar>
      <q-tabs align="left">
        <q-btn-dropdown color="primary" label="Select chart to display">
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
        <q-btn color="primary" icon-right="schedule" label="Your time" />
      </q-tabs>
    </q-header>
    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated>
      <q-form @login="onLogin" @erase="onErase" class="q-gutter-md">
        <q-input filled v-model="Email" label="Email" hint="xxx@yyy" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <q-input filled v-model="Password1" label="Password" :type="isPwd ? 'Password' : 'text'" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-checkbox v-model="customModel" label="Remember username and password ?" true-value="yes" false-value="no" />

        <div>
          <q-btn label="Login" type="login" color="primary" />
          <q-btn label="Erase" type="erase" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
      <br />
      <br />
      <hr />
      <br />
      <div class="text-h5 text-blue">
        <u>New User :</u>
      </div>
      <br />
      <br />
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="Name" label="Your email" hint="xxx@yyy" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <q-input filled v-model="Password" label="Password" :type="isPwd1 ? 'Password' : 'text'" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']">
          <template v-slot:append>
            <q-icon :name="isPwd1 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd1 = !isPwd1" />
          </template>
        </q-input>
        <q-input filled v-model="PasswordSame" label="Password" :type="isPwd2 ? 'Password' : 'text'" lazy-rules
          :rules="[val => val && Password == PasswordSame || 'Passwords must be the same !']">
          <template v-slot:append>
            <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd2 = !isPwd2" />
          </template>
        </q-input>

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'// rajout

export default {
  name: 'UserLogin',
  setup() {
    const rightDrawerOpen = ref(false)
    const $q = useQuasar()// rajout
    const Name = ref(null)// rajout
    const Password = ref(null)// rajout
    const accept = ref(false)// rajout
    const Email = ref(null)
    const Password1 = ref(null)
    const customModel = ref(false)
    const PasswordSame = ref(null)
    return {
      isPwd: ref(true),
      isPwd1: ref(true),
      isPwd2: ref(true),
      email: ref(''),
      //Début du rajout dans le return
      Name,
      Password,
      Password1,
      PasswordSame,
      Email,
      accept,
      customModel,
      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset() {
        Name.value = null
        Password.value = null
        PasswordSame.value = null
        accept.value = false
      },
      onErase() {
        Email.value = null
        Password1.value = null
        customModel.value = false
      },
      onLogin() {
      },
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  },
  methods: {
    createUser() {

    },
    updateUser() {

    },
    getUser() {

    },
    deleteUser() {

    },
  },
  props: {
    city: String,
    date: Date
  }
}
</script>
    
<style scoped>
h1 {
  margin: 40px 0 0;
}


select {
  width: 40%
}

div.bouton-aligne {
  display: inline-block;
  width: 45%;
  margin: 10px 2.5% 10px 2.5%;
  text-align: center;
}
</style>
  