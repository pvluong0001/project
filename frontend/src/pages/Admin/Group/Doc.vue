<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{group.name}}</div>
    </q-card-section>
    <q-card-section class="text-right">
      <q-btn-dropdown color="teal" label="Create">
        <q-list>
          <q-item clickable v-close-popup @click="buildFormLink">
            <q-item-section>
              <q-item-label>Create from link</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-card-section>

    <q-dialog v-model="build.link" full-width full-height>
      <q-card>
        <q-card-section>
          <div class="text-h5">Build</div>
        </q-card-section>
        <q-card-section>
          <q-input dense filled v-model="build.linkValue" placeholder="Enter links" @keyup.enter="buildLink"/>
        </q-card-section>
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-9" style="height: calc(100vh - 200px)">
            <q-card-section style="height: 100%">
              <q-inner-loading :showing="isLoading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>
              <transition
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
              >
                <iframe
                  width="100%"
                  height="100%"
                  :src="build.exactLink"
                  v-if="build.exactLink"
                  id="iframe"
                  allowfullscreen
                ></iframe>
              </transition>
            </q-card-section>
          </div>
          <div class="col-3">
            Action
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
  import request from 'request'

  export default {
    name: 'Doc',
    data: () => ({
      group: {},
      build: {
        link: true,
        linkValue: 'https://topdev.vn/blog/api-authentication-trong-laravel-vue-spa-su-dung-jwt-auth/',
        exactLink: ''
      },
      isLoading: false
    }),
    async created() {
      const response = await this.$axios.get(`/group/${this.$route.params.id}`);

      this.onResponse(response, data => {
        this.group = data;
      }, () => {
        this.$router.replace('/admin/group');
      });
    },
    methods: {
      buildFormLink() {
        this.build.link = true
      },
      async buildLink() {
        request(this.build.linkValue, (err, response, body) => {
          console.log(response, body);
        })
        // this.build.exactLink = this.build.linkValue;
        // this.isLoading = true
        //
        // this.$nextTick(() => {
        //   document.getElementById('iframe').onload = function() {
        //     this.isLoading = false
        //
        //     // console.log(document.getElementById('iframe').contentWindow.document);
        //
        //   document.getElementById('iframe').
        //   }.bind(this)
        // })
      }
    },
  };
</script>

<style>
  * {
    color: red;
  }
</style>
