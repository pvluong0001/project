<template>
  <q-card>
    <q-card-section>
      <div class="text-h5 text-teal">{{user.name}}</div>
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
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  import userDetail from 'src/store/particles/userDetail';

  export default {
    name: 'Detail',
    computed: {
      user() {
        return this.$store.state.userDetail.user;
      },
    },
    destroyed() {
      this.$store.unregisterModule('userDetail');
    },
    methods: {
      fetchImage (avatar = null) {
        return avatar ? this.$asset(avatar) : '/statics/default.png'
      }
    }
  };
</script>

<style scoped>

</style>
