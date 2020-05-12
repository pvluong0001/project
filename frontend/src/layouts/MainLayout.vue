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
                    <q-icon :name="fabYoutube" color="red" size="28px"/>
                    <q-toolbar-title shrink class="text-weight-bold">
                        YouTube
                    </q-toolbar-title>
                </q-btn>

                <q-space/>

                <div class="YL__toolbar-input-container row no-wrap">
                    <q-input dense outlined square v-model="search" placeholder="Search" class="bg-white col"/>
                    <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated/>
                </div>

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
                        <q-list>
                            <q-item clickable v-close-popup :to="{name: 'profile'}">
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
                    </q-btn-dropdown>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
                v-model="leftDrawerOpen"
                show-if-above
                bordered
                content-class="bg-grey-2"
                :width="240"
        >
            <q-scroll-area class="fit">
                <q-list padding>
                    <q-item v-ripple clickable to="/admin" exact
                            @click.native="addRememberTab({path: '/admin', title: 'Dashboard'})">
                        <q-item-section avatar>
                            <q-icon color="grey" name="home"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Dashboard</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator class="q-ma-xs" />
                    <q-item v-ripple clickable :to="{name: 'group'}" exact
                            @click.native="addRememberTab({path: '/admin/group', title: 'Group'})">
                        <q-item-section avatar>
                            <q-icon color="grey" name="calendar_today"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Group</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator class="q-ma-xs" />
                    <q-item v-ripple clickable to="/admin/calendar" exact
                            @click.native="addRememberTab({path: '/admin/calendar', title: 'Calendar'})">
                        <q-item-section avatar>
                            <q-icon color="grey" name="calendar_today"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Calendar</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <div class="q-pt-sm">
                <div class="remember-box">
                    <q-chip square @click="go(path)" clickable :color="activeRememberTab === path ? 'teal' : 'grey-3'"
                            :key="index" v-for="({path, title}, index) in rememberTabs"
                            @remove="removeRememberTab(index, path)" class="cursor-pointer q-mb-none"
                            :text-color="activeRememberTab === path ? 'white' : 'black'" removable size="13px">
                        {{title}}
                    </q-chip>
                </div>
                <div class="q-pa-sm">
                  <router-view/>
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
import { fabYoutube } from '@quasar/extras/fontawesome-v5'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      activeRememberTab: null
    }
  },
  async created () {
    this.activeRememberTab = this.$route.fullPath

    this.fabYoutube = fabYoutube
    await this.loadUser()

    /** clear notify */
    this.setNotify(null)
  },
  computed: {
    ...mapState('user', ['isLogged', 'user']),
    ...mapState('notify', ['notify']),
    ...mapState('helper', ['rememberTabs'])
  },
  watch: {
    notify () {
      if (this.notify) {
        this.$q.notify({
          color: this.notify.color,
          message: this.notify.message,
          position: 'top-right',
          icon: 'check_circle',
          timeout: 2000
        })

        this.$store.commit('user/setNotify', null)
      }
    },
    $route (to, from) {
      this.activeRememberTab = to.fullPath
    }
  },
  methods: {
    ...mapState('notify', ['setNotify']),
    ...mapActions('user', ['loadUser']),
    logout () {
      this.$store.dispatch('user/LOGOUT')
    },
    addRememberTab (payloads) {
      this.$store.dispatch('helper/ADD_REMEMBER_TAB', payloads)
    },
    removeRememberTab (tabIndex, path) {
      if (this.activeRememberTab !== path) {
        this.$store.dispatch('helper/REMOVE_REMEMBER_TAB', tabIndex)
      } else {
        if (this.rememberTabs.length) {
          this.$store.dispatch('helper/REMOVE_REMEMBER_TAB', tabIndex)

          const length = this.rememberTabs.length
          if (length === 0) {
            if (this.activeRememberTab !== '/admin') {
              this.$store.dispatch('helper/ADD_REMEMBER_TAB', {
                path: '/admin',
                title: 'Dashboard'
              })

              this.$router.replace('/admin')
            } else {
              this.$store.dispatch('helper/ADD_REMEMBER_TAB', {
                path: '/admin',
                title: 'Dashboard'
              })
            }
          } else {
            this.$router.replace(this.rememberTabs[length - 1].path)
          }
        } else {
          this.$store.dispatch('helper/ADD_REMEMBER_TAB', {
            path: '/admin',
            title: 'Dashboard'
          })

          this.$router.replace('/admin')
        }
      }
    },
    go (path) {
      if (this.activeRememberTab !== path) {
        this.$router.replace(path)
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .YL {
        &__toolbar-input-container {
            min-width: 100px;
            width: 55%;
        }

        &__toolbar-input-btn {
            border-radius: 0;
            border-style: solid;
            border-width: 1px 1px 1px 0;
            border-color: rgba(0, 0, 0, .24);
            max-width: 60px;
            width: 100%;
        }

        &__drawer-footer-link {
            color: inherit;
            text-decoration: none;
            font-weight: 500;
            font-size: .75rem;
        }

        &:hover {
            color: #000;
        }
    }

    .remember-box {
        border-bottom: 1px solid #c2c2c2;
        min-height: 32px;
    }
</style>
