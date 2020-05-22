<template>
  <q-card>
    <q-card-section>
      <div class="text-h5">{{user.name}}</div>
    </q-card-section>
    <q-card-section class="row q-col-gutter-md">
      <div class="col-4 col-md-3 text-center">
        <img :src="fetchImage(user.avatar)" width="80%" alt="">
      </div>
      <div class="col-8 col-md-9">
        <p><b>Name: </b>{{user.name}}</p>
        <p><b>Fullname: </b>{{user.fullName}}</p>
        <p><b>Email: </b>{{user.email}}</p>
        <p><b>Phone: </b>{{user.phone}}</p>
        <p><b>Address: </b>{{user.address}}</p>
        <p>
          <b>Group</b><br>
        </p>
        <div class="text-right">
          {{model}}
          <group-select
            v-model="model"
            :multi-select="true"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  import userDetail from 'src/store/particles/userDetail';
  import GroupSelect from 'components/Admin/Common/GroupSelect';

  export default {
    name: 'Detail',
    components: {GroupSelect},
    data: () => ({
      model: []
    }),
    preFetch({store, currentRoute}) {
      store.registerModule('userDetail', userDetail);

      return store.dispatch('userDetail/getUserDetail', currentRoute.params.id);
    },
    destroyed() {
      this.$store.unregisterModule('userDetail');
    },
    computed: {
      user() {
        return this.$store.state.userDetail.user;
      },
    },
    methods: {
      fetchImage (avatar = null) {
        return avatar ? this.$asset(avatar) : '/statics/default.png'
      },
    }
  };
</script>

<style scoped>

</style>
