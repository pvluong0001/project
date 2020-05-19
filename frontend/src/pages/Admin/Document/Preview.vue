<template>
  <q-card>
    <q-card-section class="text-h6 text-center">
      {{doc.name}}
    </q-card-section>
    <q-card-section class="text-right">
      <q-btn icon="restore_from_trash" color="red-10" @click="confirm = true">
        <q-tooltip>Delete</q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section class="office-preview q-pa-md">
      <div class="wrapper" v-html="doc.content">
      </div>
    </q-card-section>

    <confirm
      title="Do you want to delete this document?"
      :confirm="confirm"
      @cancel="confirm = false"
      @confirm="handleDelete"
    />
  </q-card>
</template>

<script>
import Confirm from 'components/Admin/Common/Confirm'

export default {
  data: () => ({
    doc: {},
    confirm: false
  }),
  components: {
    Confirm
  },
  async created () {
    const documentId = this.$route.params.id
    const response = await this.$store.dispatch('document/getDetail', documentId)

    if (response.data) {
      this.doc = response.data
    }
  },
  methods: {
    async handleDelete () {
      const result = await this.$store.dispatch('document/deleteDocument', this.$route.params.id)

      if (result) {
        this.$q.notify({
          color: 'teal',
          message: 'Delete document success!',
          position: 'top-right'
        })

        this.$router.replace('/admin/document')
      }
    }
  }
}
</script>

<style lang="scss">
@import 'src/css/pages/document.scss';

</style>
