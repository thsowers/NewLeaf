<template>
    <div class="position">
        <q-btn round icon="delete" color="negative" @click="cancel()"/>
            <h1>{{_id}}</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState, mapActions } from 'vuex'

@Component({
  computed: mapState({
    positions: state => state.positions,
  }),
  methods: {
    ...mapActions(['getPosition', 'removePosition']),
  },
  props: ['_id'],
})
export default class Position extends Vue {
  showLeft = true

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
        this.removePosition({ params: { id: _id } })
      })
  }
}
</script>

<style scoped lang="scss">
.position {
  margin: 30px;
}
</style>
