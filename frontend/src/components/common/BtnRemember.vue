<template>
  <q-btn :color="$attrs.color || 'teal'" :to="$attrs.to" :label="$attrs.label" @click.native="addRememberTab($attrs.tagLabel || $attrs.label, $attrs.to)"/>
</template>

<script>
export default {
  name: 'BtnRemember'
}
</script>
