<template>
    <div class="q-pa-lg">
        <div class="text-right">
            <q-btn color="teal" :label="$t('button.add_event')" @click="createEventDialog = true"/>
        </div>
        <FullCalendar
                default="dayGridMonth"
                :plugins="plugins"
                :events="events"
                :header="{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }"
                :editable="true"
                :droppable="true"
                @eventResize="resizeHandler"
                @eventDrop="dropHandler"
        />

        <q-dialog v-model="createEventDialog">
            <q-card style="min-width: 500px">
                <form @submit.prevent.stop="create">
                    <q-card-section>
                        <div class="text-h6">{{$t('text.create_event')}}</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="q-mb-xs">
                            <q-input v-model="event.title" stack-label :label="$t('label.event.title')"/>
                        </div>
                        <div class="q-mb-xs">
                            <q-input v-model="event.title" stack-label :label="$t('label.event.title')"/>
                        </div>
                        <div class="q-mb-xs">
                            <q-input v-model="event.title" stack-label :label="$t('label.event.title')"/>
                        </div>
                        <div class="q-mb-xs">
                            <q-checkbox v-model="event.allDay" :label="$t('label.event.allDay')"/>
                        </div>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="OK" color="primary" v-close-popup/>
                        <q-btn flat label="OK" color="primary" v-close-popup/>
                    </q-card-actions>
                </form>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import time from '../../../config/time'
import { baseColor, borderColor, textColor } from '../../../config/base'
import { mapState } from 'vuex'

export default {
  name: 'Index',
  components: { FullCalendar },
  data: () => ({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    createEventDialog: false,
    event: {
      title: '',
      start: time.work.start,
      end: time.work.end,
      allDay: false,
      url: null,
      editable: false,
      backgroundColor: baseColor,
      borderColor: borderColor,
      textColor: textColor,
      user: null
    },
    events: [
      { title: 'event 1', start: moment().format(), allDay: true }
    ]
  }),
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    resizeHandler (info) {
      console.log(info)
    },
    dropHandler (info) {
      console.log(info, 'info')
    }
  },
  mounted () {
    console.log(this.user)
  }
}
</script>

<style scoped lang='scss'>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
</style>
