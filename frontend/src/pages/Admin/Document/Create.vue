<template>
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
      />
    </div>
    <div class="col-4">
      <q-card>
        <q-card-section>
          <div class="text-h6">Extra data</div>
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-badge color="teal" v-for="(item, key) in extraData" @click="addExtraData(item)" :label="item" class="q-pa-sm cursor-pointer" :key="key"/>
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn color="teal" label="Create"/>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="extraModal">
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Pick extra data(Double click)</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-sm">
          <q-badge v-for="(item, index) in extras" class="q-pa-md cursor-pointer" style="font-size: 14px" @dblclick="addExtraData(item.key)" :key="index" :label="item.label"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card-section>
</template>

<script>
import editorConfig from 'src/config/editor'

export default {
  name: 'Document-Create',
  data: function () {
    return {
      editor: '',
      extraModal: false
    }
  },
  mixins: [editorConfig]
}
</script>

<style>
</style>
