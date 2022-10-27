<template>

    <div class="column">
      <q-space />

      <div v-if="userId==null">
        
        <q-form v-if="isLogin" @login="onLogin" @reset="resetLogin" class="q-gutter-md">
          <q-input filled v-model="email" label="Email" hint="xxx@yyy" lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />

          <q-input filled v-model="password" label="Password" :type="isPwd ? 'password' : 'text'" lazy-rules
            :rules="[val => val && val.length > 0 || 'Password is required']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-checkbox v-model="customModel" label="Remember username and password ?" true-value="yes" false-value="no" />

          <div class="flex row q-gutter-sm">
            <q-btn class="col" label="Login" type="login" color="primary" />
            <q-btn class="col" label="Erase" type="reset" color="negative" />
            <q-btn class="col" label="Register" color="primary" flat @click="toggleLogin" />

          </div>
        </q-form>

        <q-form v-else @submit="onRegister" @reset="clearRegisterFields" class="q-gutter-md">
          <q-input filled v-model="email1" label="Email" hint="xxx@yyy" lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />
          <q-input filled v-model="username" label="Username" lazy-rules
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
            <q-btn class="col" label="Submit" type="submit" color="primary" />
            <q-btn class="col" label="Reset" type="reset" color="negative" />
            <q-btn class="col" label="Login" color="primary" flat @click="toggleLogin" />

          </div>
        </q-form>
        
      </div>

      <q-btn v-else color="negative" icon-right="logout" label="Disconnect" @click="onDisconnect" />

      <q-space />
    </div>
      
    
    
</template>

<script>

import UserService from "../service/UserService";
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  name: 'User',
  data() {
    return {
      isLogin : true,
      $q : useQuasar(),
      isPwd : ref(true),
      isPwd1 : ref(true),
      isPwd2 : ref(true),
      email : ref(""),
      email1 : ref(""),
      username : ref(""),
      password : ref(""),
      password1 : ref(""),
      password2 : ref(""),
      accept : ref(false),
      customModel : ref(false),
      userId : null
    }
  },
  methods:{
    toggleLogin(){
      this.isLogin = !this.isLogin;
    },
    clearRegisterFields(){
      this.email1 = null;
      this.password1 = null;
      this.password2 = null;
      this.accept = false;
    },
    resetLogin() {
      this.email = null;
      this.password = null;
      this.customModel = false;
    },
    onRegister() {
      if (this.accept !== true) {
        this.$q.notify = {
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        }
      }
      else {
        this.$q.notify= {
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        }

        this.createUser(this.email1, this.username, this.password1);
      }
    },


    createUser(email, username, password){
      UserService.postUser(email, username, password).then((response)=>{
        try {
          this.userId = response.data.data.id
          this.$emit('create-user-event', {id: response.data.data.id})
          this.clearRegisterFields();
        } catch (e) {
          console.log(e);
        }
      }).catch(e => console.log(e));
    },
    
    onLogin() {
    },

    onDisconnect(){
      this.userId = null;
      this.$emit('create-user-event', {id: null});
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
  