<template>

    <div class="column">
      <q-space />

      <div v-if="userId==null">
        
        <q-form v-if="isLogin" @submit="onLogin" @reset="clearLoginFields" class="q-gutter-md">
          <q-input filled v-model="username" label="Username" hint="xxx@yyy" lazy-rules
            :rules="[val => val && val.length > 0 || 'Username is required']" />

          <q-input filled v-model="password" label="Password" :type="isPwd ? 'password' : 'text'" lazy-rules
            :rules="[val => val && val.length > 0 || 'Password is required']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-checkbox v-model="customModel" label="Remember username and password ?" true-value="yes" false-value="no" />

          <div class="flex row q-gutter-sm">
            <q-btn class="col" label="Log in" type="submit" color="secondary" />
            <q-btn class="col" label="Erase" type="reset" color="negative" />
            <q-btn class="col" label="Register" color="secondary" flat @click="toggleLogin" />

          </div>
        </q-form>

        <q-form v-else @submit="onRegister" @reset="clearRegisterFields" class="q-gutter-md">
          <q-input filled v-model="email" label="Email" hint="xxx@yyy" lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />
          <q-input filled v-model="username1" label="Username" lazy-rules
            :rules="[val => val && val.length > 0 || 'Username is required']" />
            
          <q-input filled v-model="password1" label="Password" :type="isPwd1 ? 'password' : 'text'" lazy-rules
            :rules="[val => val && val.length >= 8 || '8 characters minimum']">
            <template v-slot:append>
              <q-icon :name="isPwd1 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd1 = !isPwd1" />
            </template>
          </q-input>
          <q-input filled v-model="password2" label="Password" :type="isPwd2 ? 'password' : 'text'" lazy-rules
            :rules="[val => val && password1 == password2 || 'Passwords must be the same !']">
            <template v-slot:append>
              <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd2 = !isPwd2" />
            </template>
          </q-input>

          <q-toggle v-model="accept" label="I accept the license and terms" />

          <div class="flex row q-gutter-sm" >
            <q-btn class="col" label="Register" type="submit" color="secondary" />
            <q-btn class="col" label="Reset" type="reset" color="negative" />
            <q-btn class="col" label="Login" color="secondary" flat @click="toggleLogin" />

          </div>
        </q-form>
        
      </div>

      <div v-else-if="connectedUserData!==null" class="flex column align-center">
        <div class="text-h5">Connected as {{connectedUserData.username}}</div>

        <q-form v-if="isLogin" class="q-gutter-md">

          <q-input filled v-model="connectedUserData.email" label="Email" lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" >
            <template v-slot:after>
              <q-btn class="col" label="Edit" color="secondary" @click="onUpdate"/>
            </template>
          </q-input>
   
        </q-form>

        <q-space/>

        <q-btn color="negative" icon-right="logout" label="Disconnect" @click="onDisconnect" />

      </div>

      <q-space />
    </div> 
    
</template>

<script>

import UserService from "../service/UserService";
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  name: 'UserComponent',
  setup () {
    const $q = useQuasar()

    return {
      showNotif (positive, message) {
        $q.notify({
          color: (positive ? "positive" : "negative"),
          textColor: 'white',
          icon: (positive ? "cloud_done" : "warning"),
          message: message
        })
      }
    }
  },
  data() {
    return {
      connectedUserData : null,
      userId : null,

      isLogin : true,
      isPwd : ref(true),
      isPwd1 : ref(true),
      isPwd2 : ref(true),
      username : ref(""),
      email : ref(""),
      username1 : ref(""),
      password : ref(""),
      password1 : ref(""),
      password2 : ref(""),
      accept : ref(false),
      customModel : ref(false)
      
    }
  },
  methods:{
    toggleLogin(){
      this.isLogin = !this.isLogin;
    },
    clearRegisterFields(){
      this.email = null;
      this.password1 = null;
      this.password2 = null;
      this.accept = false;
    },
    clearLoginFields() {
      this.email = null;
      this.password = null;
      this.customModel = false;
    },
    onRegister() {
      if (!this.accept) this.showNotif (false, 'You need to accept the license and terms first')
        
      else {
        this.$emit('user-request-loading-event');
        UserService.postUser(this.email, this.username1, this.password1).then((response)=>{
          try {
            this.showNotif (true, 'Registration complete. You are now logged in')
            this.userId = response.data.data.id
            this.$emit('user-create-event', {id: response.data.data.id})
            this.clearRegisterFields();
            this.updateConnectedUserData()
          } catch (e) {
            console.log(e);
          }
        }).catch(e => {
          this.$emit('user-request-failed-event');
          this.showNotif (false, 'Failed to register');
          console.log(e)
        });      
      }
    },
    onLogin() {
      this.$emit('user-request-loading-event');
      UserService.login(this.username, this.password).then((response)=>{
        try {
          this.userId = response.data.data.id
          this.$emit('user-login-event', {id: response.data.data.id});
          this.clearLoginFields();
          this.updateConnectedUserData();
          this.showNotif (true, 'You are now logged in');
        } catch (e) {
          console.log(e);
        }
      }).catch(e => {
        console.log(e);
        this.$emit('user-request-failed-event');
        this.showNotif (false, 'Invalid credentials');
      });
    },
    onUpdate(){
      this.updateUser(this.connectedUserData.email, this.connectedUserData.username, this.userId);
    },
    onDisconnect(){
      this.userId = null;
      this.updateConnectedUserData()
      this.$emit('user-logout-event');
    },

    updateUser(email, username, userId){
      UserService.putUser(email, username, userId).then((response)=>{
        try {
          this.updateConnectedUserData()
          this.showNotif (true, `Email updated to ${email}`);
        } catch (e) {
          console.log(e);
        }
      }).catch(e => {
        console.log(e)
        this.showNotif (false, `Update error`);
      });
    },

    getUser(userId){
      UserService.getUser(userId).then((response)=>{
        try {
          console.log(response)
        } catch (e) {
          console.log(e);
        }
      }).catch(e => console.log(e));
    },

    deleteUser(userId){
      UserService.deleteUser(userId).then((response)=>{
        try {
          console.log(response)
        } catch (e) {
          console.log(e);
        }
      }).catch(e => console.log(e));
    },
    updateConnectedUserData(){
      if(this.userId) UserService.getUser(this.userId).then(response =>  this.connectedUserData = response.data.data )
      else this.connectedUserData = null;

    }
  },
  created: function () {
    this.updateConnectedUserData()
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
  