<template>
  <q-list>
    <q-item clickable v-close-popup to="/admin/profile" exact @click.native="addRememberTab('User profile', '/admin/profile')">
      <q-item-section avatar>
        <q-avatar icon="account_circle" size="sm" color="teal" text-color="white"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Edit profile</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-close-popup @click="logout">
      <q-item-section avatar>
        <q-avatar icon="exit_to_app" size="sm" color="teal" text-color="white"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Logout</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
  export default {
    name: 'UserOptions',
    methods: {
      logout() {
        this.$store.dispatch('user/LOGOUT');
      }
    }
  };
</script>

<style scoped>

</style>
