<template>
    <q-layout-drawer id="drawer" side="left" v-model="showLeft" no-scroll>
        <q-list dark id="list" no-border link inset-separator no-scroll>
            <q-item v-for="pos in positions" :to=pos._id>
                <q-item-side icon="computer"/>
                <q-item-main :label=pos.company :sublabel=pos.title />
            </q-item>
        </q-list>
    </q-layout-drawer>
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
    ...mapActions(['getPositions']),
  },
})
export default class SideBar extends Vue {
  showLeft = true
}
</script>

<style>
#drawer {
  overflow: auto !important;
  background-color: #343434;
}
</style>
