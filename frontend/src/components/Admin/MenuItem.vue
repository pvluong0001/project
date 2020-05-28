<template>
  <q-item
    v-ripple
    clickable
    :to="menu.path"
    exact
    @click.native="addRememberTab(menu.label, menu.path)"
    v-if="!menu.children"
  >
    <q-item-section avatar>
      <q-icon color="grey" :name="menu.icon"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{menu.label}}</q-item-label>
    </q-item-section>
  </q-item>
  <q-expansion-item
    v-else
    :icon="menu.icon"
    :label="menu.label"
    expand-separator

  >
    <q-item
      v-ripple
      clickable
      v-for="(submenu, index) in menu.children"
      :to="submenu.path"
      exact
      :key="index"
      @click.native="addRememberTab(submenu.label, submenu.path)"
    >
      <q-item-section avatar>
        <q-icon color="grey" :name="submenu.icon || 'home'"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{submenu.label}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: ['menu']
  };
</script>

<style scoped>

</style>
