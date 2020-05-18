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
          <q-input v-model="name" dense filled placeholder="Enter document name" :rules="[val => !!val || 'Field is required']"/>
        </q-card>
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Extra data</div>
          </q-card-section>
          <q-card-section class="q-gutter-sm">
            <div v-for="(item, key) in extra" :key="key">
              <label>
                {{key}}
              </label>
              <q-input filled dense v-model="item.value" @input="updateExtraData(key)"/>
            </div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section class="text-right">
            <q-btn color="teal" label="Create" @click="handleCreate"/>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-form>
</template>

<script>
import editorConfig from 'src/config/editor'
import { mapState } from 'vuex'
import { get } from 'lodash'

export default {
  name: 'Document-Create',
  data: function () {
    return {
      editor: '',
      extraModal: false,
      name: null,
      document: {},
      extra: {},
      templateData: {},
      test: {}
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  async created () {
    const documentId = this.$route.params.id
    const response = await this.$store.dispatch('document/getDetail', documentId)

    if (response) {
      const data = response.data
      this.document = JSON.parse(JSON.stringify(data))
      this.name = data.name

      /** template data */
      this.templateData.user = { ...this.user }

      this.extra = this.document.extraData.reduce((obj, item) => {
        obj[item] = {
          value: get(this.templateData, item)
        }
        return obj
      }, {})

      this.editor = this.fetchTemplateData(data.content)
    }
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
    },
    fetchTemplateData (data) {
      Object.keys(this.extra).forEach(key => {
        data = data.replace(`:${key}`, `<span data-key="${key}">${this.extra[key].value}</span>`)
      })

      return data
    },
    updateExtraData (key) {
      document.querySelector(`span[data-key='${key}']`).textContent = this.extra[key].value
    }
  }
}
</script>

<style>c
  .editor .q-editor__content div {
    margin: 5px 0;
  }
</style>
