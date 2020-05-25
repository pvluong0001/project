<template>
  <q-card>
    <q-card-section>
      <div class="text-h5 text-teal">{{user.name}}</div>
    </q-card-section>
    <q-card-section class="row q-col-gutter-md">
      <div class="col-4 col-md-3 text-center">
        <img :src="fetchImage(user.avatar)" width="80%" alt="">
      </div>
      <div class="col-8 col-md-9">
        <p><b>Name: </b>{{user.name}}</p>
        <p><b>Fullname: </b>{{user.fullName}}</p>
        <p><b>Email: </b>{{user.email}}</p>
        <p><b>Phone: </b>{{user.phone}}</p>
        <p><b>Address: </b>{{user.address}}</p>
        <p>
          <b>Group</b><br>
        </p>
        <group-select
          v-model="model"
          :multi-select="true"
          @cancel="resetHandle"
          @removeGroup="removeGroup"
        >
          <template v-slot:btnAction>
            <q-btn label="Build skills" color="purple" class="q-pa-xs" dense @click="buildSkills"/>
          </template>
        </group-select>
        <div v-if="skills.length">
          <div class="q-mb-md" v-for="(skill, index) in skills" :key="index">
            <vue-apex-charts
              :type="skill.type" :options="skill.options" :series="skill.series"
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  import userDetail from 'src/store/particles/userDetail';
  import GroupSelect from 'components/Admin/Common/GroupSelect';
  import {mapGetters} from 'vuex';
  import VueApexCharts from 'vue-apexcharts';
  import {convertSkillsToChartConfig} from 'helpers/skills';

  export default {
    name: 'Detail',
    components: {GroupSelect, VueApexCharts},
    data: () => ({
      model: [],
      skills: [],
      options: {
        labels: ['April']
      },
      series: [
        {
          name: "Radar Series 1",
          data: [45]
        }
      ]
    }),
    preFetch({store, currentRoute}) {
      store.registerModule('userDetail', userDetail);

      return store.dispatch('userDetail/getUserDetail', currentRoute.params.id);
    },
    destroyed() {
      this.$store.unregisterModule('userDetail');
    },
    computed: {
      ...mapGetters({
        flattenGroup: 'group/flattenGroup',
      }),
      user() {
        return this.$store.state.userDetail.user;
      },
    },
    methods: {
      fetchImage (avatar = null) {
        return avatar ? this.$asset(avatar) : '/statics/default.png'
      },
      resetHandle() {
        this.model = []
      },
      removeGroup(selected) {
        this.model = this.model.filter(item => item !== selected)
      },
      buildSkills() {
        try {
          this.skills = convertSkillsToChartConfig(this.flattenGroup.filter(item => this.model.includes(item._id)))
        } catch(e) {
          console.log(e);
          this.$q.notify({
            color: 'negative',
            message: 'Invalid format group',
            position: 'top-right'
          });
        }
      }
    }
  };
</script>

<style scoped>

</style>
