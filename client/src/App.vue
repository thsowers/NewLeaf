<template>
    <!-- main wrapping component -->
    <q-layout view="hHh Lpr lFf" id="app">

        <!-- Header -->
        <q-layout-header>

            <q-tabs id="nav" >
                <q-route-tab slot="title" icon="person" to="/" replace
                             hide="icon" label="Positions"/>
                <q-route-tab slot="title" icon="map" to="/map" replace
                             hide="icon" label="Locations"/>
                <q-route-tab slot="title" icon="home" to="/company" replace
                             hide="icon" label="Companies"/>
            </q-tabs>
            <Add/>
        </q-layout-header>
        <SideBar/>

        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import SideBar from './views/SideBar'
import Add from './components/Add'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: { SideBar, Add },
  computed: mapState({
    positions: state => state.positions,
  }),
  methods: {
    ...mapActions(['getPositions']),
  },
  mounted() {
    this.getPositions()
  },
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300');

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #353b48;
}

#nav {
  padding: 10px;
  background-color: #3d9970;
}
</style>
