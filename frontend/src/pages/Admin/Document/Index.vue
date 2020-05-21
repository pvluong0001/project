<template>
  <div class="">
    <q-card class="col-12 q-ma-md">
      <q-card-section class="flex justify-between">
        <div class="text-h6">Template document</div>
        <btn-remember v-if="hasRole(CONSTANT.ROLE.ADMIN)" label="Create" :to="{path: '/admin/document/create', title: 'Document Create'}"/>
      </q-card-section>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-2" v-for="document in rootDoc" :key="document._id">
          <router-link :to="`/admin/document/${document._id}/create`" class="text-center text-bold normal-link block">
            <q-img src="/statics/document.png"/>
            <p class="q-mt-md">{{document.name}}</p>
            <q-tooltip>{{document.name}}</q-tooltip>
          </router-link>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="col-12 q-ma-md">
      <q-card-section>
        <div class="text-h6">My document</div>
      </q-card-section>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-2" v-for="document in myDoc" :key="document._id">
          <router-link :to="`/admin/document/${document._id}/preview`" class="text-center text-bold normal-link block">
            <q-img src="/statics/document.png"/>
            <p class="q-mt-md">{{document.name}}</p>
            <q-tooltip>{{document.name}}</q-tooltip>
          </router-link>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import BtnRemember from 'src/components/common/BtnRemember'

export default {
  name: 'Document',
  data: () => ({
    editor: '',
    rootDoc: [],
    myDoc: []
  }),
  components: {
    BtnRemember
  },
  async created () {
    const docs = await this.$store.dispatch('document/list')

    docs.forEach(doc => {
      if (doc.isRoot) {
        this.rootDoc.push(doc)
      } else {
        this.myDoc.push(doc)
      }
    })
  },
  methods: {

  }
}
</script>

<style>
</style>
