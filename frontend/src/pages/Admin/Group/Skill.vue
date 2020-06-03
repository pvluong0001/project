<template>
  <q-card>
    <q-card-section class="text-right">
      <btn-remember
        label="Create skill"
        to="/admin/group/skill/create"
      />
    </q-card-section>
    <q-card-section>
      <q-table
        title="Skill"
        :data="list"
        :columns="columns"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-if="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-center">Example Chart</div>
              {{fetchVersions(props.row.skills)}}
              <vue-apex-charts
                width="100%"
                type="radar"
                :series="defaultSeries(props.row.skills[0].skills)"
                :options="defaultConfig(props.row.skills[0].skills)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
  import BtnRemember from 'components/common/BtnRemember';
  import VueApexCharts from 'vue-apexcharts';
  import chartMixin from 'mixins/chart';

  export default {
    name: 'Skill',
    components: {BtnRemember, VueApexCharts},
    mixins: [chartMixin],
    data: () => ({
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: 'name'
        },
        {
          name: 'mode',
          label: 'Mode',
          field: 'mode'
        }
      ],
      series: [
        {
          name: "User skill",
          data: [50, 50, 50, 50, 50, 50]
        },
        {
          name: "Radar Series 2",
          data: [26, 21, 20, 6, 8, 15]
        }
      ]
    }),
    computed: {
      list() {
        return this.$store.state.skillStore.list
      }
    },
    created() {
      this.$store.dispatch('skillStore/list')
    }
  };
</script>

<style scoped>

</style>
