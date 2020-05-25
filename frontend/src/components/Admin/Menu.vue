<template>
  <q-drawer
    v-model="computedValue"
    show-if-above
    bordered
    content-class="bg-grey-2"
    :width="240"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          v-ripple
          clickable
          :to="path"
          exact
          @click.native="addRememberTab(label, path)"
          v-for="({label, path, icon}, index) in menu"
          :key="index"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="icon"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{label}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
  import menu from 'src/config/menu';

  export default {
    name: 'MainMenu',
    props: ['leftDrawerOpen'],
    computed: {
      computedValue: {
        get() {
          return this.leftDrawerOpen
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    },
    data: () => ({
      menu,
    }),
  };
</script>

<style scoped>

</style>
