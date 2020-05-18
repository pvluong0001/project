<template>
  <q-card>
    <q-card-section>
      <q-table
        grid
        :columns="columns"
        :data="list"
        row-key="_id"
        title="User management"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            123
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async created () {
    await this.$store.dispatch('user/getList')
  },
  computed: {
    ...mapState('user', ['list'])
  },
  data: () => ({
    columns: [
      {
        name: 'name',
        label: 'Name',
        field: 'name'
      },
      {
        name: 'email',
        label: 'Email',
        field: 'email'
      },
      {
        name: 'phone',
        label: 'Phone',
        field: 'phone'
      },
      {
        name: 'actions'
      }
    ]
  })
}
</script>

<style>
</style>
