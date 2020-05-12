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
        Content
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

export default {
  meta: {
    title: 'Edit profile'
  },
  computed: {
    ...mapState('user', ['user'])
  },
  data: () => ({
    changeAvatarImage: false,
    avatar: null
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
    }
  }
}
</script>

<style>
</style>
