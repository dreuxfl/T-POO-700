<template>
  <div class="q-pa-md">
    <q-table title="Users" :rows="rows" :columns="columns" row-key="name" :filter="filter">
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
          <q-btn round outline style="color: blue" @click="onTime(props.row)">
            <div class="text-blue">
              <q-icon name="timer" />
            </div>
          </q-btn>

          <q-btn round outline style="color: yellow" @click="onEdit(props.row)">
            <div class="text-yellow">
              <q-icon name="mode_edit" />
            </div>
          </q-btn>

          <q-btn round outline style="color: red" @click="onDelete(props.row)">
            <div class="text-red">
              <q-icon name="delete" />
            </div>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'

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
    field: row => row.name,
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
  { name: 'actions', label: 'Action', field: 'actions', image: 'thumb_up' }
]

const rows = [
  {
    id: 1,
    name: 'Frozen Yogurt',
    email: 'frozen.yogurt@gmail.com'
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
    email: 'ice.cream.sandwich@gmail.com'
  },
  {
    id: 3,
    name: 'Eclair',
    email: 'eclair@gmail.com'
  },
  {
    id: 4,
    name: 'Cupcake',
    email: 'cupcacke@gmail.com'
  },
  {
    id: 5,
    name: 'Gingerbread',
    email: 'gingerbread@gmail.com'
  },
  {
    id: 6,
    name: 'Jelly bean',
    email: 'jelly.bean@gmail.com'
  },
  {
    id: 7,
    name: 'Lollipop',
    email: 'lollipop@gmail.com'
  },
  {
    id: 8,
    name: 'Honeycomb',
    email: 'honeycomb@gmail.com'
  },
  {
    id: 9,
    name: 'Donut',
    email: 'donut@gmail.com'
  },
  {
    id: 10,
    name: 'KitKat',
    email: 'kitkat@gmail.com'
  }
]

export default {
  name: 'WorkingTime',
  setup() {
    function onTime(row) {
      console.log('onEdit', row)
    }

    function onEdit(row) {
      console.log('onEdit', row)
    }

    function onDelete(row) {
      console.log('onEdit', row)
    }

    return {
      filter: ref(''),
      columns,
      rows,
      onTime,
      onEdit,
      onDelete
    }
  }
}
</script>
