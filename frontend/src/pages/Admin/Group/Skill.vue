<template>
  <q-card>
    <q-card-section class="flex justify-between">
      <div class="text-h5">Skills</div>
      <div>

      </div>
    </q-card-section>
    <q-card-section>
      <validation-observer v-slot="{handleSubmit, invalid}">
        <form @submit.prevent.stop="handleSubmit(submit)" class="full-width row q-col-gutter-sm">
          <form-group-item
            name="name"
            label="Skill Name"
            rules="required"
            class="col-6 test"
            v-model="formData.name"
          />
          <div class="flex-break"></div>
          <form-group-item
            name="mode"
            label="Mode"
            rules="required"
            class="col-6"
          >
            <q-radio v-model="mode" color="teal" val="auto" label="Auto select"/>
            <q-radio val="single" v-model="mode" color="teal" label="Single select"/>
          </form-group-item>
          <form-group-item
            name="skills"
            label="Skill"
            rules="required"
            class="col-12"
          >
            <group-select
              v-model="formData.skills"
              :multi-select="true"
              @cancel="resetHandle"
              @removeGroup="removeGroup"
              slot-scope="{errors}"
            />
          </form-group-item>
          <action-area>
            <q-btn label="Build skills" type="submit" :disable="invalid" color="purple" class="q-pa-xs" dense/>
          </action-area>
        </form>
      </validation-observer>
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
  import skillStore from 'src/store/particles/skillStore';
  import FormGroupItem from 'components/common/FormGroupItem';
  import ActionArea from 'components/common/ActionArea';

  export default {
    name: 'Skill',
    components: {ActionArea, FormGroupItem, GroupSelect, VueApexCharts},
    data: () => ({
      formData: {
        name: '',
        skills: []
      },
      model: [],
      skills: [],
    }),
    preFetch({store}) {
      store.registerModule('skillStore', skillStore);
    },
    destroyed() {
      this.$store.unregisterModule('skillStore');
    },
    computed: {
      ...mapGetters({
        flattenGroup: 'group/flattenGroup',
      }),
      mode: {
        get() {
          return this.$store.state.skillStore.mode;
        },
        set(val) {
          this.$store.commit('skillStore/setMode', val);
        },
      },
    },
    methods: {
      resetHandle() {
        this.model = [];
      },
      removeGroup(selected) {
        this.model = this.model.filter(item => item !== selected);
      },
      buildSkills() {
        this.$store.dispatch('skillStore/buildSkills', this.model);
        return;
        try {
          this.skills = convertSkillsToChartConfig(this.flattenGroup.filter(item => this.model.includes(item._id)),
            this.mode);
        } catch (e) {
          this.$q.notify({
            color: 'negative',
            message: 'Invalid format group',
            position: 'top-right',
          });
        }
      },
      submit() {
        this.$store.dispatch('skillStore/buildSkills', {
          ...this.formData,
          mode: this.mode
        })
      }
    },
  };
</script>

<style scoped>

</style>
