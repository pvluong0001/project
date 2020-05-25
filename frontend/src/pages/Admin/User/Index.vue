<template>
  <q-card>
    <q-card-section class="text-right">
      <q-btn color="teal" label="Create" :to="{name: 'user-create'}"/>
    </q-card-section>
    <q-card-section>
      <q-table
        grid
        :columns="columns"
        :data="list"
        :filter="filter"
        row-key="_id"
        hide-header
        title="User management"
        :rows-per-page-options="[ 3 ]"
      >
        <template v-slot:top-right>
          <q-input filled dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3">
            <q-card>
              <q-card-section class="text-center">
                <strong>{{props.row.name}}</strong>
              </q-card-section>
              <div class="text-center">
                <q-avatar size="100px">
                  <img :src="fetchImage(props.row.avatar)" alt="">
                </q-avatar>
              </div>
              <q-card-section>
                <q-list>
                  <q-item>
                    <q-item-section>Name</q-item-section>
                    <q-item-section side>{{props.row.fullName || props.row.name}}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Email</q-item-section>
                    <q-item-section side>{{props.row.email}}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Phone</q-item-section>
                    <q-item-section side>{{props.row.phone}}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Group</q-item-section>
                    <q-item-section side></q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section></q-item-section>
                    <q-item-section side>
                      <div>
                        <q-btn size="sm" color="teal" icon="account_box" :to="{name: 'user-detail', params: {id: props.row._id}}" class="q-mr-xs" filled/>
                        <q-btn size="sm" filled icon="restore_from_trash" @click="confirmDelete(props.row._id)" color="negative"/>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    async created() {
      await this.$store.dispatch('user/getList');
    },
    computed: {
      ...mapState('user', ['list'])
    },
    data: () => ({
      filter: '',
      selected: null,
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: 'name',
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
        },
        {
          name: 'phone',
          label: 'Phone',
          field: 'phone',
        },
        {
          name: 'actions',
        },
        {
          name: 'fullName',
          field: 'fullName'
        }
      ],
      dialog: false
    }),
    methods: {
      fetchImage (avatar = null) {
        return avatar ? this.$asset(avatar) : '/statics/default.png'
      },
      confirmDelete(id) {
        this.$q.dialog({
          title: 'Delete',
          message: 'Type <b><span class="text-negative">DELETE</span></b> to confirm!',
          html: true,
          prompt: {
            model: '',
            type: 'text',
            isValid: val => val === 'DELETE'
          },
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$store.dispatch('user/destroy', id)
        })
      }
    }
  };
</script>

<style lang="sass">
  .grid-masonry
    flex-direction: column
    height: 700px

    &--2
      > div
        &:nth-child(2n + 1)
          order: 1

        &:nth-child(2n)
          order: 2

      &:before
        content: ''
        flex: 1 0 100% !important
        width: 0 !important
        order: 1

    &--3
      > div
        &:nth-child(3n + 1)
          order: 1

        &:nth-child(3n + 2)
          order: 2

        &:nth-child(3n)
          order: 3

      &:before,
      &:after
        content: ''
        flex: 1 0 100% !important
        width: 0 !important
        order: 2
</style>
