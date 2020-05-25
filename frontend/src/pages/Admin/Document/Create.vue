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
          <q-card-section class="justify-between flex">
            <div class="text-h6">Extra data</div><q-btn color="teal" @click="createCustomExtra = true" icon="add"/>
          </q-card-section>
          <q-card-section class="q-gutter-sm">
            <q-badge color="teal" v-for="(item, index) in extraData" @click="addExtraData(item.key, item.label)" :label="item.label" class="q-pa-sm cursor-pointer" :key="index"/>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section class="text-right">
            <q-btn color="teal" label="Create" @click="handleCreate"/>
          </q-card-section>
        </q-card>
      </div>

      <q-dialog v-model="createCustomExtra">
        <q-card style="min-width: 500px">
          <q-card-section>
            <div class="text-h6">Create extra data</div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-sm">
            <q-form ref="extra_form">
              <form-group
                label="Name"
              >
                <q-input filled dense v-model="customExtra" :rules="[val => !!val || 'Field is required']"/>
              </form-group>
              <form-group wrapperClass="text-right" action-area @submit="createExtraHandle"/>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="extraModal">
        <q-card style="min-width: 500px">
          <q-card-section>
            <div class="text-h6">Pick extra data(Double click)</div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-sm">
            <q-badge v-for="(value, key) in extras" class="q-pa-md cursor-pointer" style="font-size: 14px" @click="addExtraData(key)" :key="key" :label="value"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card-section>
  </q-form>
</template>

<script>
import editorConfig from 'src/config/editor'
import FormGroup from 'components/Admin/Common/FormGroup'
import { uid } from 'quasar'

export default {
  name: 'Document-Create',
  data: function () {
    return {
      editor: '',
      extraModal: false,
      name: null,
      createCustomExtra: false,
      customExtra: ''
    }
  },
  components: {
    FormGroup
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

      const response = await this.$store.dispatch('document/create', {
        content: this.editor,
        extraData: this.extraData,
        name: this.name,
        isRoot: true
      })

      if (response.isSuccess) {
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
        message: result.message || 'Create document failed!',
        position: 'top-right'
      })
    },
    createExtraHandle () {
      this.$refs.extra_form.validate()
        .then(() => {
          this.addExtraData(uid(), this.customExtra)

          this.customExtra = ''
          this.createCustomExtra = false
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
