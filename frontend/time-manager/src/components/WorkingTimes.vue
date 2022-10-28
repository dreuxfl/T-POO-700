<template>
  <div class="q-pa-md">
    <q-table title="Working Times" :rows="rows" :columns="columns" row-key="id">
      <template v-slot:top-right="props">
        <q-btn round outline style="color: blue" @click="editWorkingTime(props.row)">
          <div class="text-blue">
            <q-icon name="add" />
          </div>
        </q-btn>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn round outline style="color: yellow" @click="editWorkingTime(props.row)">
            <div class="text-yellow">
              <q-icon name="mode_edit" />
            </div>
          </q-btn>

          <q-btn round outline style="color: red" @click="deleteWorkingTime(props.row)">
            <div class="text-red">
              <q-icon name="delete" />
            </div>
          </q-btn>
        </q-td>

        <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated>
          <h5 class="text-h5 text-blue">You are editing working time #{{ this.id }}</h5>

          <h5 class="text-h5 text-blue">Start time</h5>
          <q-input filled v-model="start">
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="start" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>

            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="start" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </q-input>

          <h5 class="text-h5 text-blue">End time</h5>
          <q-input filled v-model="end">
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="end" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>

            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="end" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </q-input>

          <q-btn round outline style="color: blue" @click="saveWorkingTime(props.row)">
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
import moment from "moment";
import WorkingTimesService from "@/service/WorkingTimesService";

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
  data() {
    return {
      columns,
      rows: [],
      rightDrawerOpen: false,
      id: null,
      start: null,
      end: null
    }
  },
  methods: {
    editWorkingTime(row) {
      this.rightDrawerOpen = true
      this.id = row.id
      this.start = row.start
      this.end = row.end
    },
    deleteWorkingTime(row) {
      console.log('onDelete', row)
    },
    saveWorkingTime () {
      WorkingTimesService.editWorkingTimes(this.id, this.start, this.end).then((response) => {
        console.log(response)
      })
    }
  },
  props: {
    selectedUserID : Number
  },
  created() {
    if (this.selectedUserID) {
      WorkingTimesService.getWorkingTimesByUser(this.selectedUserID).then((response) => {
        if(response.data.data && response.data.data.length > 0){
          for (let i = 0; i < response.data.data.length; i++) {
            this.rows.push({
              id: response.data.data[i].id,
              start: moment(response.data.data[i].start).format('ddd MM YYYY - HH:mm'),
              end: moment(response.data.data[i].end).format('ddd MM YYYY - HH:mm'),
              duration: moment.duration(new Date(response.data.data[i].end) - new Date(response.data.data[i].start)).humanize()
            })
          }
        }
      });
    }
  }
}
</script>
