<template>
    <div class="map">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />

        <l-map
                :zoom="zoom"
                :center="center"
                style="height: 2000px"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate">
            <l-tile-layer
                    :url="url"
                    :attribution="attribution"/>
        </l-map>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet'

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data() {
    return {
      zoom: 8,
      center: L.latLng(42.3601, -71.0589),
      url:
        'https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=4c653dc342be4a58996558e41ddb1d0c',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482),
      currentZoom: 1,
      currentCenter: L.latLng(42.3601, -71.0589),
      showParagraph: false,
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    showLongTooltip() {
      this.showParagraph = !this.showParagraph
    },
  },
}
</script>

<style>
.map {
  height: 100%;
}
</style>
