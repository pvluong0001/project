<template>
  <validation-provider :vid="$attrs.name" :name="$attrs.label" :rules="$attrs.rules" v-slot="{errors}" slim>
    <template v-if="$attrs.label"><label class="q-mb-xs block">{{$attrs.label}}</label></template>
    <q-input
      :type="$attrs.type || 'text'"
      v-model="computedValue"
      :error="!!errors.length"
      :error-message="errors[0]"
      filled
      :placeholder="$attrs.placeholder || `Enter ${$attrs.label.toLowerCase()}`"
      dense
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
