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
        <menu-item
          v-for="(item, index) in menu"
          :key="index"
          :menu="item"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
  import menu from 'src/config/menu';
  import MenuItem from 'components/Admin/MenuItem';

  export default {
    name: 'MainMenu',
    components: {MenuItem},
    props: ['value'],
    computed: {
      computedValue: {
        get() {
          return this.value
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
