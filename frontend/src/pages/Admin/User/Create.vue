<template>
  <q-card>
    <q-card-section>
      <div class="text-h5">Create User</div>
    </q-card-section>
    <q-card-section>
      <validation-observer v-slot="{invalid, handleSubmit}" ref="observer">
        <form @submit.prevent.stop="handleSubmit(submit)">
          <div class="text-negative">Default password: 1</div>
          <form-group-item
            label="Username"
            name="username"
            v-model="user.name"
            rules="required|max:100"
          />
          <form-group-item
            label="Email"
            name="email"
            v-model="user.email"
            rules="required|email|max:100"
          />
          <form-group-item
            label="Fullname"
            name="fullname"
            v-model="user.fullName"
            rules="required|max:100"
          />
          <form-group-item
            label="Phone"
            name="phone"
            v-model="user.phone"
            rules="required|min:9|max:12"
          />
          <form-group-item
            label="Address"
            name="address"
            v-model="user.address"
            rules="required"
          />
          <div class="text-right">
            <q-btn color="teal" type="submit" label="Save" :disable="invalid"/>
          </div>
        </form>
      </validation-observer>
    </q-card-section>
  </q-card>
</template>

<script>
  import FormGroupItem from '../../../components/common/FormGroupItem';
  export default {
    name: 'Create',
    components: {FormGroupItem},
    data: () => ({
      user: {
        name: '',
        email: '',
        fullName: '',
        phone: '',
        address: '',
        password: 1
      }
    }),
    methods: {
      async submit() {
        const response = await this.$store.dispatch('user/create', this.user);

        if(response.isSuccess) {
          this.$q.notify({
            color: 'teal',
            message: response.result.message,
            position: 'top-right'
          });

          return this.$router.push({name: 'user'})
        }

        if (response.result.errors && !Array.isArray(response.result.errors)) {
          this.$refs.observer.setErrors(response.result.errors);
        }
      }
    }
  };
</script>

<style scoped>

</style>
