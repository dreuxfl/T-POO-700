<template>
  <div class="q-pa-md">
    <q-table title="Working Times" :rows="rows" :columns="columns" :filter="filter" row-key="id">
      <template v-slot:top-right >
        <q-td  class="q-gutter-x-md flex">
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
          </q-input>

          <q-btn v-if="this.isAdmin" round outline color="secondary" @click="addWorkingTime()" :disable="this.selectedUserId === null">
              <q-icon name="add" />
          </q-btn>
        </q-td>
        
      </template>

      <template v-if="this.isAdmin" v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-xs">
          <q-btn round outline color="secondary" @click="editWorkingTime(props.row)">
            <q-icon name="mode_edit" />
          </q-btn>

          <q-btn round outline color="negative" @click="deleteWorkingTime(props.row)">
            <q-icon name="delete" />
          </q-btn>
        </q-td>

      </template>
    </q-table>

    <q-tooltip v-if="this.selectedUserId === null" 
      transition-show="rotate" transition-hide="rotate"
      class="text-body2 bg-negative" 
    > 
      Select user first 
    </q-tooltip>
  </div>

  <q-dialog v-model="showWorkingTimesModal" persistent >
    <q-card style="width: 400px; max-width: 80vw;" >
      <q-card-section>
        <div v-if="this.isEditMode" class="text-h6">Modify working time {{this.id }}</div>
        <div v-else class="text-h6">Add a working time</div>
      </q-card-section>

      <q-form @submit="submitWorkingTime">
        <q-card-section class="q-pt-none">
          <q-input filled v-model="start" label="Start time" lazy-rules
            :rules="[val => val && val.length > 0 || 'Start date required']">
            <template v-slot:append>
              <q-td class="q-gutter-x-xs" >
                <q-btn round outline color="secondary" @click="showSelectorModal(this.ModalTypes.StartDate)">
                  <q-icon name="event" />
                </q-btn>

                <q-btn round outline color="secondary" @click="showSelectorModal(this.ModalTypes.StartTime)">
                  <q-icon name="access_time" />
                </q-btn>
              </q-td>
            </template>
          </q-input>

          <q-input filled v-model="end"  label="End time" lazy-rules
            :rules="[val => val && val.length > 0 || 'End date required']">
            <template v-slot:append>
              <q-td class="q-gutter-x-xs" >
                <q-btn round outline color="secondary" @click="showSelectorModal(this.ModalTypes.EndDate)">
                  <q-icon name="event" />
                </q-btn>

                <q-btn round outline color="secondary" @click="showSelectorModal(this.ModalTypes.EndTime)">
                  <q-icon name="access_time" />
                </q-btn>
              </q-td>
            </template>
          </q-input>

          <q-card-actions align="right">
            <q-btn flat padding="xs xs" label="Cancel" color="negative"  v-close-popup />
            <q-btn flat padding="xs lg" label="OK" type="submit" color="secondary"/>
          </q-card-actions>
        </q-card-section>
      </q-form>
      
    </q-card>
  </q-dialog>
  
  <!-- #region Selector modals-->
  <q-dialog v-model="showStartDateSelector" >
    <q-date v-model="start" mask="YYYY-MM-DD HH:mm:00">
      <div class="row items-center justify-end">
        <q-btn v-close-popup label="Ok" color="secondary" flat />
      </div>
    </q-date>
  </q-dialog>

  <q-dialog v-model="showEndDateSelector">
    <q-date  v-model="end" mask="YYYY-MM-DD HH:mm:00">
      <div class="row items-center justify-end">
        <q-btn v-close-popup label="Ok" color="secondary" flat />
      </div>
    </q-date>
  </q-dialog>

  <q-dialog v-model="showStartTimeSelector">
    <q-time v-model="start" mask="YYYY-MM-DD HH:mm:00" format24h>
      <div class="row items-center justify-end">
        <q-btn v-close-popup label="Ok" color="secondary" flat />
      </div>
    </q-time>
  </q-dialog>
  
  <q-dialog v-model="showEndTimeSelector" >
    <q-time v-model="end" mask="YYYY-MM-DD HH:mm:00" format24h>
      <div class="row items-center justify-end">
        <q-btn v-close-popup label="Ok" color="secondary" flat />
      </div>
    </q-time>
  </q-dialog>

  <!-- #endregion-->
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

const ModalTypes = {
  StartDate : 0,
  EndDate : 1,
  StartTime : 2,
  EndTime : 3
}
 
export default {
  name: 'WorkingTimes',
  emits: ['workingTimesChangedEvent'],
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

      filter: "",
      ModalTypes,
      columns,
      rows: [],
      id: null,
      start: null,
      end: null,
      isEditMode: false,
      showWorkingTimesModal: false,

      showStartDateSelector: false,
      showEndDateSelector: false,
      showStartTimeSelector: false,
      showEndTimeSelector: false,

    }
  },
  methods: {
    showSelectorModal(selectorType){
      switch(selectorType){
        case ModalTypes.StartDate :
          this.showStartDateSelector = true; 
          break;
        case ModalTypes.EndDate : 
          this.showEndDateSelector = true;
          break;
        case ModalTypes.StartTime : 
          this.showStartTimeSelector = true;
          break;
        case ModalTypes.EndTime : 
          this.showEndTimeSelector = true;
          break
        default: break;
      }
    },
    addWorkingTime() {
      this.isEditMode = false;
      this.showWorkingTimesModal = true;
      this.id = null;
      this.start = moment(Date.now()).format("YYYY-MM-DD HH:00:00"),
      this.end = moment(Date.now()).format("YYYY-MM-DD HH:00:00")
    },
    editWorkingTime(row) {
      this.isEditMode = true;
      this.showWorkingTimesModal = true;
      this.id = row.id;
      this.start = row.start;
      this.end = row.end;
    },
    submitWorkingTime(){
      if(this.end > this.start) {

        if(this.isEditMode) this.saveEditedWorkingTime();

        else {
          let startDateTime = new Date(this.start);

          let duplicateRow = this.rows.find(row => 
            new Date(row.start).getFullYear() == startDateTime.getFullYear() &&
            new Date(row.start).getMonth() == startDateTime.getMonth() &&
            new Date(row.start).getDate() == startDateTime.getDate()
          );
          
          if(duplicateRow){
            this.id = duplicateRow.id;
            this.$q.dialog({
              title: `Only one working time allowed`,
              message: `You can only add one working time per day, per person. 
              Do you want to overwrite this working time : ${new Date(duplicateRow.start).toLocaleDateString()} from ${new Date(duplicateRow.start).toLocaleTimeString()} to ${new Date(duplicateRow.end).toLocaleTimeString()} ?`,
              cancel: true,
              persistent: true,
            })
            .onOk(() => this.saveEditedWorkingTime());
          } else this.saveNewWorkingTime();
        }
      } else if (this.end == this.start){
        this.showNotif(false, "Working time start and end time cannot be equal")
      } else {
        this.showNotif(false, "Working time start time must precede end time")
      }
    },
    saveNewWorkingTime() {
      WorkingTimesService.addWorkingTime(this.token, this.selectedUserId, this.start, this.end)
      .then(() => {
        this.showNotif(true, "Working time added successfully!");
        this.showWorkingTimesModal = false;
        this.$emit('workingTimesChangedEvent');

      })
      .catch(e => {
        console.log(e)
      })
    },
    saveEditedWorkingTime () {
      WorkingTimesService.editWorkingTimes(this.token, this.id, this.start, this.end)
        .then(() => {
          this.showNotif(true, "Working time updated successfully!");
          this.showWorkingTimesModal = false;
          this.$emit('workingTimesChangedEvent');

        })
        .catch(e => {
          console.log(e)
        })
    },
    deleteWorkingTime(row) {
      this.$q.dialog({
        title: `Confirm delete working time #${row.id}`,
        message: `Are you sure you want to delete this working time ?`,
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        WorkingTimesService.deleteWorkingTimes(this.token, row.id)
        .then(() => {
          this.showNotif(true, "Working time deleted successfully!")
          this.$emit('workingTimesChangedEvent');
        })
        .catch(e => {
          console.log(e)
        })            
      })      
    }
  },
  props: {
    selectedUserId : Number,
    isAdmin: Boolean
  },
  created() {
    this.token = localStorage.getItem('access_token');
    if (this.selectedUserId) {
      WorkingTimesService.getWorkingTimesByUser(this.token, this.selectedUserId)
      .then(response => {
        if(response.data.data && response.data.data.length > 0){
          for (let i = 0; i < response.data.data.length; i++) {
            this.rows.push({
              id: response.data.data[i].id,
              start: moment(response.data.data[i].start).format('YYYY-MM-DD HH:mm:00'),
              end: moment(response.data.data[i].end).format('YYYY-MM-DD HH:mm:00'),
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
