<template>
    <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="marker"></l-marker>
    </l-map>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

@Component({
  components: {},
})
export default class Location extends Vue {
  showLeft = true
}
</script>

<style scoped>
</style>
