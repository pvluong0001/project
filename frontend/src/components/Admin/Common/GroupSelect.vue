<template>
  <div class="row">
    <q-input class="full-width" dense readonly filled :value="getGroupNameById(computedValue)">
      <template v-slot:after>
        <q-btn dense color="teal" label="Select group" class="q-pa-xs" @click="modal = true"/>
      </template>
    </q-input>

    <q-dialog v-model="modal">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Pick group {{getGroupNameById(computedValue)}}</div>
        </q-card-section>
        <q-card-section>
          <template v-if="treeGroup.length">
            <q-tree
              :nodes="treeGroup"
              node-key="_id"
              label-key="name"
              default-expand-all
              :selected.sync="computedValue"
              selected-color="primary"
              v-if="!multiSelect"
            />
            <q-tree
              :nodes="treeGroup"
              node-key="_id"
              label-key="name"
              default-expand-all
              tick-strategy="strict"
              :ticked.sync="computedValue"
              v-else
            />
          </template>
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn label="Pick" color="teal" class="q-mr-sm" @click="selectGroupHandle"/>
          <q-btn color="grey" label="Cancel" v-close-popup/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    text: '',
    modal: false,
    selectedGroupName: ''
  }),
  props: {
    value: [String, Array],
    multiSelect: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.$store.dispatch('group/getList')
  },
  computed: {
    ...mapGetters({
      flattenGroup: 'group/flattenGroup',
      treeGroup: 'group/treeGroup'
    }),
    computedValue: {
      get() {
        console.log(this.value);
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    selectGroupHandle () {
      this.selectedGroupName = this.getGroupNameById(this.selected)
      this.modal = false
    },
    getGroupNameById (groupId) {
      return this.flattenGroup.find(group => group._id === groupId)?.name
    }
  }
}
</script>

<style>
  .q-tree__node--selected .q-tree__node-header-content::after {
    content: '(Selected)';
    color: crimson;
    font-weight: bold;
    margin-left: 5px;
  }
</style>
