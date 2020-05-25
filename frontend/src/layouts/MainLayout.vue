<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-toolbar-title shrink class="text-weight-bold">
            {{brandName}}
          </q-toolbar-title>
        </q-btn>

        <q-space/>

        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn-dropdown
            push
            glossy
            no-caps
          >
            <template v-slot:label>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>

              <span class="q-ml-sm">{{user.name}}</span>
            </template>
            <user-options/>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <main-menu v-model="leftDrawerOpen"/>

    <q-page-container>
      <div class="q-pt-sm">
        <remember/>
        <div class="q-pa-sm">
          <router-view/>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import Remember from 'components/Admin/Remember';
  import MainMenu from 'components/Admin/Menu';
  import UserOptions from 'components/Admin/UserOptions';

  export default {
    name: 'MyLayout',
    components: {UserOptions, MainMenu, Remember},
    data() {
      return {
        leftDrawerOpen: false,
        brandName: 'Luong Lit',
      };
    },
    async created() {
      await this.loadUser();
    },
    computed: {
      ...mapState('user', ['isLogged', 'user']),
    },
    methods: {
      ...mapActions('user', ['loadUser'])
    },
  };
</script>

<style scoped lang="scss">

</style>
