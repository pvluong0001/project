<template>
  <q-card>
    <q-card-section>
      <div class="text-h5">
        Edit profile
      </div>
    </q-card-section>
    <q-card-section class="row">
      <div class="relative-position">
        <q-avatar style="width: 300px;height: 300px;">
          <img :src="fetchImage(user.avatar)" alt="">
        </q-avatar>

        <div class="text-center bg-grey-3 q-pa-xs absolute-bottom cursor-pointer" style="opacity: 0.4;" @click="openChangeAvatarImage">
          <q-icon name="linked_camera" size="sm"/>
        </div>
      </div>
      <div style="flex: 1;" class="q-pa-sm">
        <q-form ref="form">
          <form-group label="Name" required>
            <q-input filled dense v-model="userData.name" :rules="[val => !!val || 'Description is required']"/>
          </form-group>
          <form-group label="Email">
            <q-input filled dense :value="user.email" readonly class="disabled"/>
          </form-group>
          <form-group label="Fullname">
            <q-input filled dense v-model="userData.fullName"/>
          </form-group>
          <form-group label="Phone">
            <q-input filled dense v-model="userData.phone"/>
          </form-group>
          <form-group label="Address">
            <q-input filled dense v-model="userData.address"/>
          </form-group>
          <form-group wrapperClass="text-right" action-area @submit="submitHandle"/>
        </q-form>
      </div>
    </q-card-section>

    <q-dialog v-model="changeAvatarImage">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Change avatar</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section style="min-width: 500px;">
          <q-file outlined v-model="avatar">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn color="teal" label="Save" @click="changeAvatarHandle"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormGroup from 'components/Admin/Common/FormGroup'
import validateMixins from 'mixins/validate'
import pick from 'lodash/pick'

export default {
  meta: {
    title: 'Edit profile'
  },
  components: {
    FormGroup
  },
  mixins: [
    validateMixins
  ],
  computed: {
    ...mapState('user', ['user'])
  },
  created () {
    this.userData = { ...pick(this.user, ['name', 'fullName', 'address', 'phone']) }
  },
  data: () => ({
    changeAvatarImage: false,
    avatar: null,
    userData: {}
  }),
  methods: {
    ...mapActions({
      changeAvatar: 'user/uploadAvatar'
    }),
    openChangeAvatarImage () {
      this.changeAvatarImage = true
    },
    async changeAvatarHandle () {
      if (!this.avatar) {
        this.$store.commit('notify/setNotify', {
          color: 'negative',
          message: 'Avatar is required!'
        })
        return
      }
      const response = await this.changeAvatar(this.avatar)
      if (response) {
        this.$store.commit('user/updateUser', {
          avatar: response
        })
      }

      this.avatar = null
      this.changeAvatarImage = false
    },
    fetchImage (avatar = null) {
      return avatar ? this.$asset(avatar) : 'statics/default.png'
    },
    async submitHandle () {
      const validate = await this.validateForm()

      if (validate) {
        this.$store.dispatch('user/updateInfo', this.userData)
      }
    }
  }
}
</script>

<style>
</style>
