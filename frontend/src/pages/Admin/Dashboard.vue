<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="editor"
      min-height="5rem"
      readonly
      :toolbar="[]"
    />
    <q-input v-model="acc.email"/>

    <q-card flat bordered>
      <q-card-section>
        <pre style="white-space: pre-line">{{ editor }}</pre>
      </q-card-section>
    </q-card>

    <q-card flat bordered>
      <q-card-section v-html="editor" />
    </q-card>
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
  computed: {
    editor () {
      const test = `<span style="color: red" disabled>${this.acc.email}</span>`
      return 'What you see is :id you get. '.replace(':id', test)
    }
  },
  methods: {
    login () {
      this.$store.dispatch('user/LOGIN', this.acc)
    }
  }
}
</script>
