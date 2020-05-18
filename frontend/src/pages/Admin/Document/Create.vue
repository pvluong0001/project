<template>
  <q-form ref="form">
    <q-card-section class="row q-col-gutter-md">
      <div class="col-8">
        <q-editor
          v-model="editor"
          min-height="calc(100vh - 400px)"
          placeholder="Build document"
          :definitions="definitions"
          ref="editor"
          :toolbar="toolbar"
          :fonts="fonts"
          class="editor"
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="col-4">
        <q-card class="q-pa-sm q-mb-md">
          <!-- TODO: need use component-->
          <q-input v-model="name" dense filled placeholder="Enter document name" :rules="[val => !!val || 'Field is required']" ref=""/>
        </q-card>
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Extra data</div>
          </q-card-section>
          <q-card-section class="q-gutter-sm">
            <q-badge color="teal" v-for="(item, key) in extraData" @click="addExtraData(item)" :label="item" class="q-pa-sm cursor-pointer" :key="key"/>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section class="text-right">
            <q-btn color="teal" label="Create" @click="handleCreate"/>
          </q-card-section>
        </q-card>
      </div>

      <q-dialog v-model="extraModal">
        <q-card style="min-width: 500px">
          <q-card-section>
            <div class="text-h6">Pick extra data(Double click)</div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-sm">
            <q-badge v-for="(item, index) in extras" class="q-pa-md cursor-pointer" style="font-size: 14px" @click="addExtraData(item.key)" :key="index" :label="item.label"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card-section>
  </q-form>
</template>

<script>
import editorConfig from 'src/config/editor'

export default {
  name: 'Document-Create',
  data: function () {
    return {
      editor: '',
      extraModal: false,
      name: null
    }
  },
  created () {
    this.toolbar.push(['addExtraData'])
  },
  mixins: [editorConfig],
  methods: {
    async handleCreate () {
      const validate = await this.$refs.form.validate()
      if (!validate) {
        return
      }

      const result = await this.$store.dispatch('document/create', {
        content: this.editor,
        extraData: this.extraData,
        name: this.name,
        isRoot: true
      })

      if (result) {
        this.$q.notify({
          color: 'teal',
          message: 'Create document success!',
          position: 'top-right'
        })

        this.$router.replace('/admin/document')
        return
      }

      this.$q.notify({
        color: 'negative',
        message: 'Create document failed!',
        position: 'top-right'
      })
    }
  }
}
</script>

<style>
  .editor .q-editor__content div {
    margin: 5px 0;
  }
</style>
