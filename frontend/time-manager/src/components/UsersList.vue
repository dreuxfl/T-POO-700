<template>
  <div class="q-pa-md">
    <q-table title="Users" :rows="rows" :columns="columns" row-key="id" :filter="filter" @row-click="rowClicked">
      <template v-slot:top-right="props">
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
               @click="props.toggleFullscreen" />
      </template>

      <template v-slot:body-cell-actions="props" >
        <q-td :props="props" class="q-gutter-x-xs">
          <q-btn round outline color="secondary" @click="showEditUserModal(props.row)">
            <q-icon name="mode_edit" />
          </q-btn>

          <q-btn round outline color="negative" @click="deleteUser(props.row)">
            <q-icon name="delete" />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="showUserEdit" persistent >
    <q-card style="width: 400px; max-width: 80vw;" >
      <q-card-section>
        <div class="text-h6">Edit user #{{this.id }}</div>
      </q-card-section>
      <q-form @submit="saveEditedUser">
        <q-card-section class="q-pt-none">
          <q-input filled v-model="email" label="Email" hint="xxx@yyy" lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />
          <q-input filled v-model="username" label="Username" lazy-rules
            :rules="[val => val && val.length > 0 || 'Username is required']" />
          <q-card-actions align="right">
            <q-btn flat padding="xs xs" label="Cancel" color="negative"  v-close-popup />
            <q-btn flat padding="xs lg" label="OK" type="submit" color="secondary"/>
          </q-card-actions>
        </q-card-section>
      </q-form>
      
    </q-card>
  </q-dialog>
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
  emits: ['userSelectEvent','userListChangedEvent'],
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
      token: null,
      columns,
      rows: [],
      filter: '',
      rightDrawerEditingUser: false,
      selectedUserId: null,
      username: null,
      email: null,
      showUserEdit: false,
    }
  },
  methods: {
    rowClicked (e, row) {
      if (e.target.nodeName === 'TD') {
        this.selectUser(row)
      }
    },
    selectUser(row) {
      this.selectedUserId = row.id;
      this.$emit('userSelectEvent', {id: this.selectedUserId});
    },
    showEditUserModal(row) {
      this.showUserEdit = true;
      this.id = row.id;
      this.username = row.username;
      this.email = row.email;
    },
    saveEditedUser() {
      UserService.putUser(this.token, this.email, this.username, this.id)
      .then(() => {
        this.showNotif(true, "User updated successfully");
        this.$emit('userListChangedEvent');
      })
      .catch(e => {
        console.log(e);
        this.showNotif(true, "User update failed");
      })
      .finally(() => {
        this.showUserEdit= false
      });
      
    },
    deleteUser(row) {
      this.$q.dialog({
        title: `Confirm delete user #${row.id}`,
        message: `Are you sure you want to delete ${row.username} ?`,
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        UserService.deleteUser(this.token, row.id).then(() => {
          this.showNotif(true, "User deleted successfully!")
          this.$emit('userListChangedEvent');
        })
        .catch(e => {
          console.log(e)
        })
              
      })      
    }
  },
  created() {
    this.token = localStorage.getItem('access_token');
    UserService.getUsers(this.token)
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
