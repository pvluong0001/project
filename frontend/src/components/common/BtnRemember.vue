<template>
  <q-btn :color="$attrs.color || 'teal'" :to="$attrs.to" @click.native="addRemeberTab($attrs.label, $attrs.to)"/>
</template>

<script>
export default {
}
</script>
