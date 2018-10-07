<template>
    <div class="row position shadow-4">
        <div class="col-8">
            <q-list dark class="no-border">
                <q-list-header>Details</q-list-header>
                <q-item style="" id="newPosition">
                    <q-item-main class="row">
                        <q-input class="col-4" dark v-model="position.company"
                                 float-label="Company"/>
                        <q-input class="col-4" dark v-model="position.title"
                                 float-label="Title"/>
                        <q-select class="col-4"
                                  dark
                                  toggle
                                  v-model="position.status"
                                  :options="selectOptions"
                                  float-label="Status"
                                  @input="updateStatus"
                        />
                        <q-input class="col-12" type="textarea" dark
                                 v-model="position.description"
                                 float-label="Description"/>
                        <q-input class="col-6" dark
                                 v-model.lazy="position.companyURL"
                                 float-label="URL" @blur="lookupLogo"/>
                    </q-item-main>
                </q-item>
                <q-item-separator/>
                <q-list-header>Location</q-list-header>
                <q-item style="" id="newPosition">
                    <q-item-main class="row">
                        <q-input class="col-12" dark v-model="position.zipCode"
                                 float-label="Address"/>
                        <q-input class="col-2" dark v-model="position.zipCode"
                                 float-label="Zip Code"/>
                        <q-input class="col-4" dark v-model="position.city"
                                 float-label="City"/>
                        <q-input class="col-2" dark v-model="position.state"
                                 float-label="State"/>
                        <q-input class="col-2" dark v-model="position.lat"
                                 float-label="Latitude"/>
                        <q-input class="col-2" dark v-model="position.lon"
                                 float-label="Longitude"/>
                    </q-item-main>
                </q-item>
                <q-item-separator/>
                <q-list-header>Contact</q-list-header>
                <q-item style="" id="newPosition">
                    <q-item-main class="row">
                        <q-input class="col-6" dark v-model="position.first"
                                 float-label="First"/>
                        <q-input class="col-6" dark v-model="position.last"
                                 float-label="Last"/>
                        <q-input class="col-4" dark v-model="position.email"
                                 float-label="Email"/>
                        <q-input class="col-4" dark v-model="position.phone"
                                 float-label="Phone"/>
                        <q-input class="col-4" dark v-model="position.github"
                                 float-label="Github"/>
                        <q-input class="col-4" dark v-model="position.linkedIn"
                                 float-label="LinkedIn"/>
                        <q-input class="col-4" dark v-model="position.HN"
                                 float-label="HN"/>
                        <q-input class="col-4" dark v-model="position.keybase"
                                 float-label="Keybase"/>

                    </q-item-main>
                </q-item>
                <q-item-separator/>
                <q-list-header>Events</q-list-header>
                <q-item style="" id="newPosition">
                    <q-item-main class="row">
                        <q-input class="col-8" dark v-model="event.name"
                                 float-label="Title"/>
                        <q-datetime type="date" class="col-4" dark
                                    v-model="event.date"
                                    float-label="Date"/>
                        <q-input class="col-8" dark v-model="event.description"
                                 float-label="Details"/>
                        <q-uploader :url=uploadURL class="col-4" dark
                                    float-label="Attachments"/>
                    </q-item-main>

                </q-item>
                <div class="q-pa-sm" style="height: 60px">
                    <q-btn class="float-right on-right" icon="save"
                           color="primary"
                           @click="addEvent()" label="Add Event"/>
                </div>
                <div class="q-pa-sm" style="height: 60px">
                    <q-btn class="float-right on-right" icon="save"
                           color="primary"
                           @click="update()" label="Update"/>
                    <q-btn class="float-right" icon="delete" color="negative"
                           @click="cancel()" label="Remove"/>
                </div>
            </q-list>
        </div>
        <div class="col-4">
            <q-timeline dark responsive>
                <q-timeline-entry v-for="e in position.events"
                                  :title=e.name
                                  :subtitle=computeDatePretty(e.timestamp)>
                    <div>
                        {{e.description}}
                    </div>
                </q-timeline-entry>
            </q-timeline>
        </div>
    </div>


</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState, mapActions } from 'vuex'
import QCard from 'quasar-framework/src/components/card/QCard'
import axios from 'axios'
import QItemSeparator from 'quasar-framework/src/components/list/QItemSeparator'
import moment from 'moment'
import QDatetime from 'quasar-framework/src/components/datetime/QDatetime'

@Component({
  components: { QDatetime, QItemSeparator, QCard },
  methods: {
    ...mapActions(['getPosition', 'removePosition', 'updatePosition']),
  },
  computed: mapState({
    positions: state => state.positions,
  }),
  props: { _id: String },
  watch: {
    $route(to, from) {
      this.getPositionData()
    },
  },
})
export default class Position extends Vue {
  showLeft = true
  position = {}
  uploadURL = ''
  event = { date: new Date() }
  selectOptions = [
    {
      label: 'Not Started',
      value: 'notStarted',
    },
    {
      label: 'App Submitted',
      value: 'appSubmitted',
    },
    {
      label: 'Awaiting Interview',
      value: 'awaitingInterview',
    },
    {
      label: 'Interview Complete',
      value: 'interviewComplete',
    },
    {
      label: 'Negotiating',
      value: 'negotiating',
    },
    {
      label: 'Rejected',
      value: 'rejected',
    },
    {
      label: 'Rejected - Position Already Filled',
      value: 'rejectedPositionAlreadyFilled',
    },
    {
      label: 'Accepted',
      value: 'accepted',
    },
  ]

  mounted() {
    this.getPositionData()
  }

  computeDatePretty(timeStamp) {
    return moment(timeStamp).format('MMM DD')
  }

  async lookupLogo() {
    let { _id, companyURL } = this.$data.position

    // Cleanup URLs to get root
    if (companyURL.includes('http')) {
      companyURL = companyURL.replace('http://', '')
      companyURL = companyURL.replace('https://', '')
    }

    axios
      .post('http://localhost:3000/logoLookup/' + _id, {
        url: companyURL,
      })
      .then(data => {
        this.$data.position.companyLogo = data.data
        this.updatePosition({
          data: this.$data.position,
          params: { _id: this._id },
        })
      })
  }

  update() {
    this.updatePosition({
      data: this.$data.position,
      params: { _id: this._id },
    })
  }

  addEvent() {
    // TODO: Keep array sorted by timestamp
    this.$data.event.timestamp = new Date(this.$data.event.date)
    this.$data.position.events.push(this.$data.event)
    this.update()
    this.$data.event = {}
  }

  cancel() {
    console.log('removing')
    const { _id } = this.$props
    this.$q
      .dialog({
        title: 'Delete',
        message:
          "Are you sure you want to delete this position and all of it's data?",
        ok: 'Agree',
        cancel: 'Disagree',
      })
      .then(() => {
        this.$q.notify(_id)
        this.removePosition({ params: { _id: _id } })
      })
  }

  getPositionData() {
    this.getPosition({ params: { _id: this._id } }).then(
      position => (this.position = position.data)
    )
  }
}
</script>

<style scoped lang="scss">
.q-input,
q-select {
  margin-right: 15px !important;
}

.col-4 {
  width: 30% !important;
}

.col-2 {
  width: 15% !important;
}

.position {
  margin: 30px;
  border: none;
  background-color: #343434;
}
</style>
