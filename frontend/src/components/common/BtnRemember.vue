<template>
  <q-btn :color="color" label="Create" :to="to" @click.native="addRemeberTab(to)"/>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'teal'
    },
    label: String,
    to: [Object, String]
  },
  methods: {
    addRemeberTab (payloads) {
      this.$store.dispatch('helper/ADD_REMEMBER_TAB', payloads)
    }
  }
}
</script>

<style>
</style>
