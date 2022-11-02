<template>
  <div class="q-pa-md">
    <q-table title="Working Times" :rows="rows" :columns="columns" row-key="id">
      <template v-slot:top-right>
        <q-btn round outline color="primary" @click="addWorkingTime()">
            <q-icon name="add" />
        </q-btn>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn round outline color="secondary" @click="editWorkingTime(props.row)">
            <q-icon name="mode_edit" />
          </q-btn>

          <q-btn round outline color="negative" @click="deleteWorkingTime(props.row)">
            <q-icon name="delete" />
          </q-btn>
        </q-td>

      </template>
    </q-table>
  </div>

  <q-dialog v-model="showWorkingTimesCreate" persistent >
    <q-card style="width: 400px; max-width: 80vw;" >
      <q-card-section>
        <div class="text-h6">Add a working time{{this.id }}</div>
      </q-card-section>
      <q-form @submit="submitWorkingTime(true)">
        <q-card-section class="q-pt-none">
          <div class="text-h6">Start time</div>
          <q-input filled v-model="start">
            <template v-slot:append>
              <q-td class="q-gutter-x-xs" >
                <q-btn round outline color="primary" @click="showModal(true, false)">
                  <q-icon name="event" />
                </q-btn>

                <q-btn round outline color="primary" @click="showModal(true, true)">
                  <q-icon name="access_time" />
                </q-btn>
              </q-td>
            </template>
          </q-input>

          <div class="text-h6">End time</div>
          <q-input filled v-model="end">
            <template v-slot:append>
              <q-td class="q-gutter-x-xs" >
                <q-btn round outline color="primary" @click="showModal(false, false)">
                  <q-icon name="event" />
                </q-btn>

                <q-btn round outline color="primary" @click="showModal(false, true)">
                  <q-icon name="access_time" />
                </q-btn>
              </q-td>
            </template>
          </q-input>

          <q-card-actions align="right">
            <q-btn flat label="OK" type="submit" color="primary"/>
            <q-btn flat label="Cancel" color="negative"  v-close-popup />
          </q-card-actions>
        </q-card-section>
      </q-form>
      
    </q-card>
  </q-dialog>
  
  <q-dialog v-model="showDateSelector" >
    <q-date v-if="isStartDate" v-model="start" mask="YYYY-MM-DD HH:mm">
      <div class="row items-center justify-end">
        <q-btn v-close-popup label="Ok" color="primary" flat />
      </div>
    </q-date>
    <q-date v-else v-model="end" mask="YYYY-MM-DD HH:mm">
      <div class="row items-center justify-end">
        <q-btn v-close-popup label="Ok" color="primary" flat />
      </div>
    </q-date>
  </q-dialog>

  <q-dialog v-model="showTimeSelector" >
    <q-time v-if="isStartDate" v-model="start" mask="YYYY-MM-DD HH:mm" format24h>
      <div class="row items-center justify-end">
        <q-btn v-close-popup label="Ok" color="primary" flat />
      </div>
    </q-time>
    <q-time v-else v-model="end" mask="YYYY-MM-DD HH:mm" format24h>
      <div class="row items-center justify-end">
        <q-btn v-close-popup label="Ok" color="primary" flat />
      </div>
    </q-time>
  </q-dialog>
</template>

<script>
import moment from "moment";
import WorkingTimesService from "@/service/WorkingTimesService";
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
    name: 'startTime',
    required: true,
    label: 'Start time',
    align: 'left',
    field: row => row.start,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'endTime',
    required: true,
    label: 'End time',
    align: 'left',
    field: row => row.end,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'duration',
    required: true,
    label: 'Duration',
    align: 'left',
    field: row => row.duration,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'actions', label: 'Action', field: 'actions' }
]

export default {
  name: 'WorkingTimes',
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
      id: null,
      start: null,
      end: null,
      showWorkingTimesCreate: false,
      showWorkingTimesEdit: false,
      showDateSelector: false,
      showTimeSelector: false,
      isStartDate: null,
    }
  },
  methods: {
    showModal(isStartDate, isTimeSelector){
      this.isStartDate = isStartDate;
      isTimeSelector? this.showTimeSelector = true : this.showDateSelector = true
    },
    addWorkingTime() {
      console.log("this.addWorkingTime")
      this.showWorkingTimesCreate = true
      this.id = null
      this.start = null
      this.end = null
    },
    editWorkingTime(row) {
      this.rightDrawerEditingWorkingTime = true
      this.id = row.id
      this.start = row.start
      this.end = row.end
    },
    submitWorkingTime(){
      if(this.isEdit) this.saveEditedWorkingTime();

      else this.saveNewWorkingTime();
    },
    saveNewWorkingTime() {
      if (this.start === null || this.end === null) {
        this.showNotif(false, "Start and end time must be filled!")
        return
      }

      WorkingTimesService.addWorkingTime(this.selectedUserId, this.start, this.end)
        .then(() => {
          this.showNotif(true, "Working time added successfully!")
          this.showWorkingTimesCreate = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    saveEditedWorkingTime () {
      WorkingTimesService.editWorkingTimes(this.id, this.start, this.end)
        .then(() => {
          this.showNotif(true, "Working time updated successfully!")
          this.rightDrawerEditingWorkingTime = false
        })
        .catch(e => {
          console.log(e)
        })
    },

    deleteWorkingTime(row) {
      WorkingTimesService.deleteWorkingTimes(row.id)
        .then(() => {
          this.showNotif(true, "Working time deleted successfully!")
        })
        .catch(e => {
          console.log(e)
        })
    },
  },
  props: {
    selectedUserId : Number
  },
  created() {
    if (this.selectedUserId) {
      WorkingTimesService.getWorkingTimesByUser(this.selectedUserId)
        .then(response => {
          if(response.data.data && response.data.data.length > 0){
            for (let i = 0; i < response.data.data.length; i++) {
              this.rows.push({
                id: response.data.data[i].id,
                start: moment(response.data.data[i].start).format('YYYY-MM-DD HH:mm'),
                end: moment(response.data.data[i].end).format('YYYY-MM-DD HH:mm'),
                duration: moment.duration(new Date(response.data.data[i].end) - new Date(response.data.data[i].start)).humanize()
              })
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
