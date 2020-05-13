export default {
  methods: {
    validateForm (config = {}) {
      const { form = 'form', allValidate = true } = config

      if (allValidate) {
        return this.$refs[form].validate()
      }

      // Object.entries(this.$refs).map(([key, element]) => {
      //   if (!except.includes(key) && element.hasOwnProperty('validate')) {
      //     if (element.validate()) {
      //       return false
      //     }
      //   }
      // })

      return Promise.resolve(true)
    }
  }
}
