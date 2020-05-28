<template>
  <div class="row">
    <q-input class="full-width" dense readonly filled :value="getGroupNameById(computedValue)">
      <template v-slot:after>
        <q-btn dense color="teal" label="Select group" class="q-pa-xs" @click="modal = true"/>
        <slot name="btnAction"></slot>
      </template>
    </q-input>

    <q-dialog v-model="modal">
      <q-card style="min-width: calc(100vw - 200px);">
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
          <q-btn color="grey" label="Reset" @click="$emit('cancel')" v-close-popup/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Confirm from 'components/Admin/Common/Confirm';

export default {
  components: {Confirm},
  data: () => ({
    text: '',
    modal: false,
    confirm: false,
    selected: null
  }),
  props: {
    value: [String, Array],
    multiSelect: {
      type: Boolean,
      default: false
    },
    objValue: Array
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
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    selectGroupHandle () {
      this.modal = false
    },
    getGroupNameById (groupId) {
      try {
        const groups = Array.isArray(groupId) ? groupId : [groupId];
        const groupArr = this.flattenGroup.filter(group => groups.includes(group._id))

        return groupArr.map(group => group.name).join(', ')
      } catch(e) {
        return ''
      }
    },
    openConfirm(item) {
      this.selected = item;
      this.confirm = true;
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
