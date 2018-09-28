<template>
    <div class="position">
        <div style="" id="newPosition">
            <q-input dark v-model="position.title" float-label="Title"/>
            <q-input dark v-model="position.description" float-label="Company"/>
        </div>
        <q-btn round icon="delete" color="negative" @click="cancel()"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState, mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions(['getPosition', 'removePosition']),
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

  mounted() {
    this.getPositionData()
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
</style>
