<template>
  <q-card-section class="row">
    <div class="col-8">
      <q-editor
        v-model="editor"
        min-height="calc(100vh - 200px)"
      />
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: 'Document',
  data: () => ({
    editor: ''
  })
}
</script>

<style>
</style>
