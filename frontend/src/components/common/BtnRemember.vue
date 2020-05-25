<template>
  <q-btn :color="$attrs.color || 'teal'" :to="$attrs.to" :label="$attrs.label" @click.native="addRememberTab($attrs.label, $attrs.to)"/>
</template>

<script>
export default {
}
</script>
