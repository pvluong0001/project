<template>
  <div class="row q-mb-sm lit__form-group">
    <div :class="`col-${labelCol} ${wrapperClass}`">
      <div class="text-h6 q-mb-sm lit__form-group__label" :class="{required}" v-if="label">{{label}}</div>
      <slot></slot>
      <template v-if="actionArea">
        <q-btn color="teal" class="q-ml-xs" v-if="actions.includes('submit')" label="Save" @click="$emit('submit')"/>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    labelCol: {
      type: [Number, String],
      default: 12
    },
    label: {
      type: String,
      default: ''
    },
    wrapperClass: {
      type: String,
      default: ''
    },
    actions: {
      type: Array,
      default: () => ['submit']
    }
  },
  created () {
    const attrs = this.$attrs
    if (attrs.hasOwnProperty('action-area')) {
      this.actionArea = true
    }

    if (attrs.hasOwnProperty('required')) {
      this.required = true
    }
  },
  data: () => ({
    actionArea: false,
    required: false
  })
}
</script>

<style>
</style>
