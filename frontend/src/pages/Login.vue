<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="flex flex-center">
                <q-card class="my-card">
                    <form @submit.prevent.stop="login">
                        <q-card-section class="bg-secondary text-white">
                            <div class="text-h6">{{$t('label.login')}}</div>
                            {{error}}
                        </q-card-section>

                        <q-separator/>

                        <q-card-section style="min-width: 400px">
                            <q-input v-model="acc.email" :hint="$t('placeholder.email')"/>
                            <q-input v-model="acc.password" type="password" :hint="$t('placeholder.password')"/>
                        </q-card-section>

                        <q-separator class="q-mt-sm q-mb-sm"/>

                        <q-card-actions align="right">
                            <q-btn color="teal" type="submit">{{$t('button.login')}}</q-btn>
                            <q-btn color="red-7">{{$t('button.login_google')}}</q-btn>
                        </q-card-actions>
                    </form>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    acc: {
      email: 'luong@test.com',
      password: '123@123a'
    }
  }),
  methods: {
    login () {
      this.$store.dispatch('user/LOGIN', this.acc)
    }
  },
  computed: {
    ...mapState(
      'user', ['error']
    )
  },
  watch: {
    error () {
      if (this.error) {
        if (Array.isArray(this.error)) {
          this.error.forEach(({ msg }) => {
            this.$q.notify({
              color: 'negative',
              message: msg,
              position: 'top-right',
              icon: 'warning',
              timeout: 2000
            })
          })
        } else {
          this.$q.notify({
            color: 'negative',
            message: this.error,
            position: 'top-right',
            icon: 'warning',
            timeout: 2000
          })
        }

        this.$store.commit('user/setError', null)
      }
    }
  }
}
</script>
