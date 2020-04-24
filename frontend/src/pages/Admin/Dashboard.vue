<template>
    <div class="q-pa-md">
        <p>123123</p>
    </div>
</template>

<script>
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
  }
}
</script>
