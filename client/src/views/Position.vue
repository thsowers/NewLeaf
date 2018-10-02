<template>
    <q-list dark class="position">
        <q-list-header>Details</q-list-header>
        <q-item style="" id="newPosition">
            <q-item-main class="row">
                <q-input class="col-4" dark v-model="position.title"
                         float-label="Title"/>
                <q-input class="col-4" dark v-model="position.company"
                         float-label="Company"/>
                <q-select class="col-4"
                          dark
                          toggle
                          v-model="position.status"
                          :options="selectOptions"
                          float-label="Status"
                />
                <q-input class="col-12" type="textarea" dark
                         v-model="position.description"
                         float-label="Description"/>
                <q-input class="col-6" dark v-model.lazy="position.companyURL"
                         float-label="URL" @blur="lookupLogo"/>
            </q-item-main>
        </q-item>
        <q-item-separator/>
        <q-list-header>Location</q-list-header>
        <q-item style="" id="newPosition">
            <q-item-main>
                <q-input dark v-model="position.zipCode"
                         float-label="Zip Code"/>
                <q-input dark v-model="position.city" float-label="City"/>
                <q-input dark v-model="position.state" float-label="State"/>
                <q-input dark v-model="position.lat" float-label="Latitude"/>
                <q-input dark v-model="position.lon" float-label="Longitude"/>
            </q-item-main>
        </q-item>
        <q-item-separator/>
        <q-list-header>Contact</q-list-header>
        <q-item style="" id="newPosition">
            <q-item-main>
                <q-input dark v-model="position.first" float-label="First"/>
                <q-input dark v-model="position.last" float-label="Last"/>
                <q-input dark v-model="position.email" float-label="Email"/>
                <q-input dark v-model="position.phone" float-label="Phone"/>
                <q-input dark v-model="position.github" float-label="Github"/>
                <q-input dark v-model="position.linkedIn"
                         float-label="LinkedIn"/>
                <q-input dark v-model="position.HN" float-label="HN"/>
            </q-item-main>
        </q-item>
        <q-item-separator/>
        <q-list-header>Events</q-list-header>
        <q-item style="" id="newPosition">
            <q-item-main>
                <q-input dark v-model="event.title" float-label="First"/>
                <q-input dark v-model="event.date" float-label="Last"/>
                <q-input dark v-model="event.attachments" float-label="Email"/>
                <q-input dark v-model="event.notes" float-label="Phone"/>
            </q-item-main>
        </q-item>
        <q-btn round icon="delete" color="negative" @click="cancel()"/>
        <q-btn icon="delete" color="primary" @click="update()" label="Update"/>
    </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState, mapActions } from 'vuex'
import QCard from 'quasar-framework/src/components/card/QCard'
import axios from 'axios'

@Component({
  components: { QCard },
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
  position = ''
  event = ''
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
    console.log(this.$data.position)
    this.updatePosition({
      data: this.$data.position,
      params: { _id: this._id },
    })
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
.position {
  margin: 30px;
}

.positionForm {
  display: flex;
  flex-wrap: nowrap;
}

.positionEntry {
  flex-grow: 1;
  width: 50% !important;
  height: 100px;
}
</style>
