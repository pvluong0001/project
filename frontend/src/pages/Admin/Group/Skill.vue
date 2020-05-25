<template>
  <q-card>
    <q-card-section>
      <div class="text-h5">Skills</div>
    </q-card-section>
    <q-card-section>
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
    </q-card-section>
    <q-card-section>
      <div class="text-h5">Preview</div>
<!--      <div v-if="groups.length" class="q-ma-sm row q-col-gutter-sm" v-for="(skills, skillIndex) in groups" :key="skillIndex">-->
<!--      <div v-if="skills.length" class="q-ma-sm row q-col-gutter-sm">-->
<!--        <div class="col-6" v-for="(skill, index) in skills" :key="index">-->
<!--          <vue-apex-charts-->
<!--            :type="skill.type" :options="skill.options" :series="skill.series"-->
<!--          />-->
<!--        </div>-->
<!--        <q-separator/>-->
<!--      </div>-->
    </q-card-section>
  </q-card>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts';
  import {convertSkillsToChartConfig} from 'helpers/skills';
  import GroupSelect from 'components/Admin/Common/GroupSelect';
  import {mapGetters} from 'vuex';

  export default {
    name: 'Skill',
    components: {GroupSelect, VueApexCharts},
    data: () => ({
      model: ["5ebbd302c170992b8d064de8", "5ebdf970be07900148219f82", "5ec7a7d0be59b80115e66590", "5ecb84678690af01c4db2baa", "5ebbbfc8bcdecc0f918722a4", "5ebbc00fbcdecc0f918722a5", "5ec78bc6bf9df202793cabd9"],
      skills: []
    }),
    computed: {
      ...mapGetters({
        flattenGroup: 'group/flattenGroup',
      }),
    },
    methods: {
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
