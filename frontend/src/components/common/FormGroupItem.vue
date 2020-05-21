<template>
  <validation-provider :vid="$attrs.name" :name="$attrs.label" :rules="$attrs.rules" v-slot="{errors}" slim>
    <q-input
      :type="$attrs.type || 'text'"
      v-model="computedValue"
      :error="!!errors.length"
      :error-message="errors[0]"
      :hint="$attrs.hint"
    />
  </validation-provider>
</template>

<script>
  export default {
    name: 'FormGroupItem',
    props: ['value'],
    computed: {
      computedValue: {
        get() {
          return this.value
        },
        set(val) {
          return this.$emit('input', val)
        }
      }
    }
  };
</script>

<style scoped>

</style>
