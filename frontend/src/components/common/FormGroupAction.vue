<template>
  <q-btn color="teal" type="button" @click="$emit('submit')">{{$attrs.label}}</q-btn>
</template>

<script>
  export default {
    name: 'FormGroupAction',
  };
</script>

<style scoped>

</style>
