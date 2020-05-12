<template>
  <q-card>
    <q-card-section>
      <q-table
        title="Group management"
        no-data-label="I didn't find anything for you"
        :data="[]"
        :columns="[{name: 'name', label: 'name'}]"
        row-key="name"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'GroupList',
  meta: {
    title: 'Group'
  },
  created () {
    this.$store.dispatch('group/getList')
  }
}
</script>

<style>
</style>
