<template>
  <div class="q-pa-md">
    <q-table title="Users" :rows="rows" :columns="columns" row-key="id" :filter="filter">
      <template v-slot:top-right="props">
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
               @click="props.toggleFullscreen" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn round outline style="color: blue" @click="editUserWorkingTimes(props.row)">
            <div class="text-blue">
              <q-icon name="timer" />
            </div>
          </q-btn>

          <q-btn round outline style="color: yellow" @click="editUser(props.row)">
            <div class="text-yellow">
              <q-icon name="mode_edit" />
            </div>
          </q-btn>

          <q-btn round outline style="color: red" @click="deleteUser(props.row)">
            <div class="text-red">
              <q-icon name="delete" />
            </div>
          </q-btn>
        </q-td>

        <q-drawer v-model="rightDrawerEditingUser" side="right" behavior="mobile" elevated>
          <h5 class="text-h5 text-blue">You are editing user #{{ this.selectedUserID }}</h5>

          <h5 class="text-h5 text-blue">Username</h5>
          <q-input filled v-model="username" />

          <h5 class="text-h5 text-blue">Email</h5>
          <q-input filled v-model="email" />

          <q-btn round outline style="color: blue" @click="saveEditedUser(props.row)">
            <div class="text-blue">
              <q-icon name="save" />
            </div>
          </q-btn>
        </q-drawer>
      </template>
    </q-table>
  </div>
</template>

<script>
import UserService from "../service/UserService";
import {useQuasar} from "quasar";

const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'username',
    required: true,
    label: 'Username',
    align: 'left',
    field: row => row.username,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: row => row.email,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'actions', label: 'Action', field: 'actions' }
]

export default {
  name: 'UsersList',
  setup () {
    const $q = useQuasar()

    return {
      showNotif (positive, message) {
        $q.notify({
          color: (positive ? "positive" : "warning"),
          textColor: 'white',
          icon: (positive ? "cloud_done" : "warning"),
          message: message
        })
      }
    }
  },
  data() {
    return {
      columns,
      rows: [],
      filter: '',
      rightDrawerEditingUser: false,
      selectedUserID: null,
      username: null,
      email: null,
    }
  },
  methods: {
    editUserWorkingTimes(row) {
      this.selectedUserID = row.id;
      this.$emit('transfer-user-event', {id: this.selectedUserID});
    },
    editUser(row) {
      this.rightDrawerEditingUser = true
      this.id = row.id;
      this.username = row.username;
      this.email = row.email;
    },
    saveEditedUser() {
      UserService.putUser(this.email, this.username, this.id)
        .then(() => {
          this.showNotif(true, "User updated successfully");
          this.rightDrawerEditingUser = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteUser(row) {
      UserService.deleteUser(row.id)
          .then(() => {
            this.showNotif(true, "User deleted successfully!")
          })
          .catch(e => {
            console.log(e)
          })
    }
  },
  created() {
    UserService.getUsers()
      .then(response => {
          if(response.data.data && response.data.data.length > 0){
            for (let i = 0; i < response.data.data.length; i++) {
              this.rows.push({
                id: response.data.data[i].id,
                username: response.data.data[i].username,
                email: response.data.data[i].email
              })
            }
          }
      })
      .catch(e => {
        console.log(e);
      });
  }
}
</script>
