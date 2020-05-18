<template>
  <q-card class="q-ma-md">
    <q-card-section class="text-right">
      <btn-remember label="Create" :to="{path: '/admin/document/create', title: 'Document Create'}"/>
    </q-card-section>
    <q-card-section class="row q-col-gutter-md">
      <div class="col-2" v-for="document in list" :key="document._id">
        <q-img src="/statics/document.png"/>
        <router-link :to="`/admin/document/${document._id}/create`" class="text-center q-mt-xs text-bold normal-link block">
          {{document.name}}
        </router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import BtnRemember from 'src/components/common/BtnRemember'

export default {
  name: 'Document',
  data: () => ({
    editor: '',
    list: []
  }),
  components: {
    BtnRemember
  },
  async created () {
    this.list = await this.$store.dispatch('document/list')
  }
}
</script>

<style>
</style>
