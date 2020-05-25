<template>
  <div class="remember-box">
    <q-chip square @click="go(path)" clickable :color="activeRememberTab === path ? 'teal' : 'grey-3'"
            :key="index" v-for="({path, label}, index) in rememberTabs"
            @remove="removeRememberTab(index, path)" class="cursor-pointer q-mb-none"
            :text-color="activeRememberTab === path ? 'white' : 'black'" removable size="13px">
      {{label}}
    </q-chip>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'Remember',
    data: () => ({
      activeRememberTab: null,
    }),
    computed: {
      ...mapState('helper', ['rememberTabs']),
    },
    methods: {
      removeRememberTab(tabIndex, path) {
        if (this.activeRememberTab !== path) {
          this.$store.dispatch('helper/REMOVE_REMEMBER_TAB', tabIndex);
        } else {
          if (this.rememberTabs.length) {
            this.$store.dispatch('helper/REMOVE_REMEMBER_TAB', tabIndex);

            const length = this.rememberTabs.length;
            if (length === 0) {
              if (this.activeRememberTab !== '/admin') {
                this.addRememberTab('Dashboard', {
                  name: 'dashboard',
                });

                this.$router.replace('/admin');
              } else {
                this.addRememberTab('Dashboard', {
                  name: 'dashboard',
                });
              }
            } else {
              this.$router.replace(this.rememberTabs[length - 1].path);
            }
          } else {
            this.addRememberTab('Dashboard', {
              name: 'dashboard',
            });

            this.$router.replace('/admin');
          }
        }
      },
      go(path) {
        if (this.activeRememberTab !== path) {
          this.$router.replace(path);
        }
      },
    },
    watch: {
      $route(to, from) {
        this.activeRememberTab = to.fullPath;
      },
    },
    async created() {
      this.activeRememberTab = this.$route.fullPath;
    },
  };
</script>

<style scoped>
  .remember-box {
    border-bottom: 1px solid #c2c2c2;
    min-height: 32px;
  }
</style>
