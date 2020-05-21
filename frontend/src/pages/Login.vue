<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="my-card">
          <form @submit.prevent.stop="login">
            <q-card-section class="bg-secondary text-white">
              <div class="text-h6">{{$t('label.login')}}</div>
            </q-card-section>
            <q-separator/>
            <validation-observer ref="observer" slim v-slot="{invalid, handleSubmit}">
              <q-card-section style="min-width: 400px">
                <form-group-item v-model="acc.email" label="Email" rules="required|email|max:100" name="email"
                                 :hint="$t('placeholder.email')"/>
                <form-group-item v-model="acc.password" type="password" label="Password" rules="required|max:100"
                                 name="password"
                                 :hint="$t('placeholder.password')"/>
              </q-card-section>
              <q-separator class="q-mt-sm q-mb-sm"/>
              <q-card-actions align="right">
                <form-group-action :label="$t('button.login')" @submit="handleSubmit(login)"/>
              </q-card-actions>
            </validation-observer>
          </form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  import FormGroupItem from 'components/common/FormGroupItem';
  import FormGroupAction from 'components/common/FormGroupAction';

  export default {
    name: 'Login',
    components: {FormGroupAction, FormGroupItem},
    data: () => ({
      acc: {
        email: 'user01@gmail.com',
        password: '123@123a',
      },
    }),
    methods: {
      async login() {
        const response = await this.$store.dispatch('user/LOGIN', this.acc);

        if (response.errors && !Array.isArray(response.errors)) {
          this.$refs.observer.setErrors({
            email: [response.errors],
          });
        }
      },
    }
  };
</script>
