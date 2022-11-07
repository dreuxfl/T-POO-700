<template>

  <div class="column">
    <q-space />

    <div v-if="token===null">
      
      <q-form v-if="isLogin" @submit="onLogin" @reset="clearFields" class="q-gutter-md">
        <q-input filled v-model="username" label="Username" hint="xxx@yyy" lazy-rules
          :rules="[val => val && val.length > 0 || 'Username is required']" />

        <q-input filled v-model="password" label="Password" :type="isPwd ? 'password' : 'text'" lazy-rules
          :rules="[val => val && val.length > 0 || 'Password is required']">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-checkbox v-model="rememberMe" label="Remember username and password ?" true-value="yes" false-value="no" />

        <div class="flex row q-gutter-sm">
          <q-btn class="col" label="Log in" type="submit" color="secondary" />
          <q-btn class="col" label="Erase" type="reset" color="negative" />
          <q-btn class="col" label="Register" color="secondary" flat @click="toggleLogin" />

        </div>
      </q-form>

      <q-form v-else @submit="onRegister" @reset="clearFields" class="q-gutter-md">
        <q-input filled v-model="email" label="Email" hint="xxx@yyy" lazy-rules
          :rules="[val => val && val.length > 0 || 'Email is required']" />
        <q-input filled v-model="username" label="Username" lazy-rules
          :rules="[val => val && val.length > 0 || 'Username is required']" />
          
        <q-input filled v-model="password" label="Password" :type="isPwd1 ? 'password' : 'text'" lazy-rules
          :rules="[val => val && val.length >= 8 || '8 characters minimum']">
          <template v-slot:append>
            <q-icon :name="isPwd1 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd1 = !isPwd1" />
          </template>
        </q-input>
        <q-input filled v-model="confirmPassword" label="Password" :type="isPwd2 ? 'password' : 'text'" lazy-rules
          :rules="[val => val && password == confirmPassword || 'Passwords must be the same !']">
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

    <div v-else-if="token!==null && this.connectedUserData!==null" class="flex column align-center">
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
      isPwd : ref(true),
      isPwd1 : ref(true),
      isPwd2 : ref(true),
      connectedUserData : null,
      userId : null,

      isLogin : true,
      
      username : ref(""),
      email : ref(""),
      password : ref(""),
      confirmPassword : ref(""),
      accept : ref(false),
      rememberMe : ref(false),
      
      token : null
    }
  },
  methods:{
    toggleLogin(){
      this.clearFields()
      this.isLogin = !this.isLogin;
    },
    clearFields(){
      this.email = null;
      this.password = null;
      this.confirmPassword = null;
      this.accept = false;
      this.rememberMe = false;
    },
    onRegister() {
      if (!this.accept) this.showNotif (false, 'You need to accept the license and terms first')
        
      else {
        this.$emit('userRequestLoadingEvent');
        UserService.postUser(this.email, this.username, this.password).then(()=>{
          UserService.login(this.username, this.password).then((response)=>{

            this.token = response.data.data.access_token
            this.$emit('userLoginEvent', {token: this.token});
            this.updateConnectedUserData();

            this.clearFields();
            this.showNotif (true, 'Register complete, you are now logged in');
          })
        }).catch(e => {
          this.$emit('userRequestFailedEvent');
          this.showNotif (false, 'Failed to register');
          console.log(e)
        });      
      }
    },
    onLogin() {
      this.$emit('userRequestLoadingEvent');
      UserService.login(this.username, this.password).then((response)=>{
        try {
          this.token = response.data.access_token
          this.$emit('userLoginEvent', {token: this.token});
          this.updateConnectedUserData();

          this.showNotif (true, 'You are now logged in');
        } catch (e) {
          console.log(e);
        }
      }).catch(e => {
        console.log(e);
        this.$emit('userRequestFailedEvent');
        this.showNotif (false, 'Invalid credentials');
      });
    },
    onUpdate(){
      UserService.putUser(this.token, this.connectedUserData.email, this.connectedUserData.username, this.connectedUserData.id).then(()=>{
        try {
          this.updateConnectedUserData()
          this.showNotif (true, `Email updated to ${this.connectedUserData.email}`);
        } catch (e) {
          console.log(e);
        }
      }).catch(e => {
        console.log(e)
        this.showNotif (false, `Update error`);
      });
    },
    onDisconnect(){
      this.token = null;
      this.updateConnectedUserData()
      this.$emit('userLogoutEvent');
    },

    updateConnectedUserData(){
      if(this.token) UserService.getProfile(this.token).then(response =>  this.connectedUserData = response.data.data )
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
  