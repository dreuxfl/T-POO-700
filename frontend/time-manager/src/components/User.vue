<template>

  <div class="column">
    <q-space />

    <div v-if="this.connectedUserId" class="text-h5">Connected as {{this.username}}</div>

    <q-form @submit="onSubmit" @reset="clearFields" class="q-gutter-md column">

      <q-input v-if="!this.isLogin || this.connectedUserId" filled v-model="email" label="Email" hint="Must have email format" lazy-rules
        :rules="[val => val && val.length > 0 || 'Email is required']" />
      <q-input filled v-model="username" label="Username" lazy-rules
        :rules="[val => val && val.length > 0 || 'Username is required']" />
        
      <q-input filled v-model="password" label="Password" :type="isPwd1 ? 'password' : 'text'" lazy-rules
        :rules="[val => val && val.length >= 8 || '8 characters minimum']">
        <template v-slot:append>
          <q-icon :name="isPwd1 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd1 = !isPwd1" />
        </template>
      </q-input>

      <q-input v-if="!this.isLogin || this.connectedUserId" filled v-model="confirmPassword" label="Password" :type="isPwd2 ? 'password' : 'text'" lazy-rules
        :rules="[val => val && password == confirmPassword || 'Passwords must be the same !']">
        <template v-slot:append>
          <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd2 = !isPwd2" />
        </template>
      </q-input>

      <q-checkbox v-if="this.isLogin" v-model="rememberMe" label="Remember username and password ?" true-value="yes" false-value="no" />

      <q-toggle v-else v-model="accept" label="I accept the license and terms" />

      <div v-if="this.connectedUserId" class="flex row q-gutter-sm" >
        <q-btn  class="col" label="Save changes" type="submit" color="secondary" />
        <q-btn class="col" label="Reset" @click="resetChanges" color="negative" />
      </div>

      <div v-else class="flex row q-gutter-sm" >
        <q-btn class="col" :label="this.isLogin ? 'Login' : 'Register'" type="submit" color="secondary" />
        <q-btn class="col" label="Reset" type="reset" color="negative" />
        <q-btn class="col" :label="!this.isLogin ? 'Login' : 'Register'" color="secondary" flat @click="toggleLogin" />
      </div>

      <q-space/>

      <q-btn v-if="this.connectedUserId" center color="negative" icon-right="logout" label="Disconnect" @click="onDisconnect" />
    </q-form>

    <q-space />
  </div> 
    
</template>

<script>

import UserService from "../service/UserService";
import AuthService from "../service/AuthService";

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
  props:{
    connectedUserId : Number,
    connectedUsername : String,
    connectedUserEmail : String,
  },
  methods:{
    toggleLogin(){
      this.clearFields()
      this.isLogin = !this.isLogin;
    },
    clearFields(){
      this.email = null;
      this.username = null;
      this.password = null;
      this.confirmPassword = null;
      this.accept = false;
      this.rememberMe = false;
    },
    resetChanges(){
      this.email = this.connectedUserEmail
      this.username = this.connectedUsername
      this.password = null;
      this.confirmPassword = null;
    },
    onSubmit(){
      if(this.connectedUserId)  this.updateProfile()
      else if(this.isLogin) this.login();
      else this.register();      
    },
    register() {
      if (!this.accept) this.showNotif (false, 'You need to accept the license and terms first')
        
      else {
        this.$emit('userRequestLoadingEvent');
        UserService.postUser(this.email, this.username, this.password).then(()=>{
          AuthService.login(this.username, this.password).then((response)=>{

            this.token = response.data.access_token;
            this.$emit('userLoginEvent', {token: this.token});

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
    login() {
      this.$emit('userRequestLoadingEvent');
      AuthService.login(this.username, this.password).then((response)=>{
        try {
          this.token = response.data.access_token
          this.$emit('userLoginEvent', {token: this.token});

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
    updateProfile(){
      UserService.putUser(this.token, this.connectedUserId, this.email, this.username, this.password).then(()=>{
        try {
          this.showNotif (true, `Profile updated successfully`);
        } catch (e) {
          console.log(e);
        }
      }).catch(e => {
        console.log(e)
        this.showNotif (false, `Update error`);
      });
    },
    onDisconnect(){
      this.clearFields();
      this.token = null;
      
      this.$emit('userLogoutEvent');
    },
  },
  created(){
    if(this.connectedUserId) {
      this.resetChanges();
      this.token = this.token = localStorage.getItem('access_token');
    }
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
  