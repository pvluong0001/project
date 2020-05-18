<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" :color="color" text-color="white" />
        <span class="q-ml-sm">
          {{title}}
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" @click="$emit('cancel')" />
        <q-btn label="Confirm" color="red-10" @click="$emit('confirm')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    color: {
      type: String,
      default: 'red-10'
    },
    confirm: Boolean
  }
}
</script>

<style></style>
