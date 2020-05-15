<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <div class="col-8">
          <div class="text-h5">Group management</div>
        </div>
        <div class="col-4 text-right">
          <q-btn color="teal" class="on-right" label="Create group" @click="createModal = true"/>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-splitter :value="50">
        <template v-slot:before>
          <div class="q-mr-md">
            <q-input ref="filter" filled v-model="filter" label="Filter">
              <template v-slot:append>
                <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
              </template>
            </q-input>
            <q-tree
              :nodes="treeGroup"
              node-key="_id"
              label-key="name"
              default-expand-all
              :filter="filter"
              :selected.sync="selected"
              selected-color="primary"
              v-if="treeGroup.length"
            />
          </div>
        </template>
        <template v-slot:after>
          <q-tab-panels
            v-model="selected"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel :name="group._id" v-for="group in groupDetailList" :key="group._id">
              <div class="text-h4 q-mb-md">{{group.name}}</div>
              <p>{{group.description}}</p>
              <div class="text-right">
                <q-btn color="red-10" label="Delete" icon="warning" @click="confirm = true"/>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card-section>

    <confirm
      title="Do you want to delete this group?"
      :confirm="confirm"
      @cancel="confirm = false"
      @confirm="handleDeleteGroup"
    />

    <q-dialog v-model="createModal">
      <q-card style="min-width: 600px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create new group</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form ref="form">
            <form-group label="Group">
              <group-select
                @select-group="($value) => {formData.parent = $value}"
                :model="formData.parent"
              />
            </form-group>
            <form-group label="Name">
              <q-input
                v-model="formData.name"
                filled
                dense
                placeholder="Enter group name"
                :rules="[val => !!val || 'Name is required']"
                ref="name"
              />
            </form-group>
            <form-group label="Description">
              <q-input type="textarea" v-model="formData.description" filled dense placeholder="Enter description of group"
                :rules="[val => !!val || 'Description is required']"
                ref="description"
              />
            </form-group>
            <form-group wrapperClass="text-right" action-area @submit="submitHandle">
            </form-group>
          </q-form>
        </q-card-section>
      </q-card>
  </q-dialog>
  </q-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import GroupSelect from 'components/Admin/Common/GroupSelect'
import FormGroup from 'components/Admin/Common/FormGroup'
import Confirm from 'components/Admin/Common/Confirm'
import validateMixins from 'mixins/validate'

export default {
  name: 'GroupList',
  meta: {
    title: 'Group'
  },
  components: {
    GroupSelect, FormGroup, Confirm
  },
  mixins: [validateMixins],
  data: () => ({
    selected: null,
    filter: '',
    createModal: false,
    formData: {
      parent: null,
      name: '',
      description: ''
    },
    confirm: false
  }),
  computed: {
    ...mapState('group', ['list']),
    ...mapGetters('group', ['treeGroup']),
    groupDetailList () {
      return this.flatArray(this.list).map(group => ({
        _id: group._id,
        name: group.name,
        description: group.description
      }))
    }
  },
  created () {
    this.$store.dispatch('group/getList')
  },
  methods: {
    flatArray (array) {
      if (!array.length) {
        return []
      }

      return array.reduce((arr, element) => {
        arr = arr.concat(element)
        Array.isArray(element.children) && (arr = arr.concat(this.flatArray(element.children)))

        return arr
      }, [])
    },
    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    async submitHandle () {
      const result = await this.validateForm()

      if (result) {
        const response = await this.$store.dispatch('group/create', this.formData)

        if (response) {
          this.$store.dispatch('group/getList')
          this.createModal = false
          this.formData = {
            parent: null,
            name: '',
            description: ''
          }
        }
      }
    },
    handleDeleteGroup () {
      console.log(this.selected)
    }
  }
}
</script>

<style>
</style>
