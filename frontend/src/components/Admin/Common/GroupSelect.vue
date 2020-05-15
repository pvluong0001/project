<template>
  <div class="row">
    <input type="hidden" v-model="selected"/>
    <q-input class="full-width" dense readonly filled :value="selectedGroupName">
      <template v-slot:after>
        <q-btn dense color="teal" label="Select group" class="q-pa-xs" @click="modal = true"/>
      </template>
    </q-input>

    <q-dialog v-model="modal">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Pick group {{selected}}</div>
        </q-card-section>
        <q-card-section>
          <q-tree
            :nodes="treeGroup"
            node-key="_id"
            label-key="name"
            default-expand-all
            :selected.sync="selected"
            selected-color="primary"
            @update:selected="handleUpdateSelected"
            v-if="treeGroup.length"
          />
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
    selected: '',
    selectedGroupName: ''
  }),
  props: {
    model: {
      type: String,
      default: ''
    }
  },
  created () {
    this.$store.dispatch('group/getList')
    this.selected = this.model
  },
  computed: {
    ...mapGetters({
      flattenGroup: 'group/flattenGroup',
      treeGroup: 'group/treeGroup'
    })
  },
  methods: {
    selectGroupHandle () {
      this.selectedGroupName = this.getGroupNameById(this.selected)
      this.modal = false
    },
    handleUpdateSelected (val) {
      this.$emit('select-group', val)
    },
    getGroupNameById (groupId) {
      return this.flattenGroup.find(group => group._id === groupId).name
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
