<template>
  <q-card>
    <q-card-section class="flex justify-between">
      <div class="text-h5">Skill Create</div>
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
            <q-radio val="single" v-model="mode" color="teal" label="Single select"/>
            <!-- TODO: mode auto -->
<!--            <q-radio v-model="mode" color="teal" val="auto" label="Auto select"/>-->
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
  </q-card>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts';
  import {convertSkillsToChartConfig} from 'helpers/skills';
  import GroupSelect from 'components/Admin/Common/GroupSelect';
  import {mapGetters} from 'vuex';
  import FormGroupItem from 'components/common/FormGroupItem';
  import ActionArea from 'components/common/ActionArea';

  export default {
    name: 'SkillCreate',
    components: {ActionArea, FormGroupItem, GroupSelect, VueApexCharts},
    data: () => ({
      formData: {
        name: '',
        skills: []
      },
      model: [],
      skills: [],
    }),
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
      async submit() {
        const response = await this.$store.dispatch('skillStore/buildSkills', {
          ...this.formData,
          mode: this.mode
        })

        if(response.isSuccess) {
          this.$q.notify({
            color: 'teal',
            message: response.result.message,
            position: 'top-right'
          });

          this.$router.replace('/admin/group/skill')
        }
      }
    },
  };
</script>

<style scoped>

</style>
