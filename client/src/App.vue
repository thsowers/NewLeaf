<template>
    <!-- main wrapping component -->
    <q-layout view="hHh Lpr lFf" id="app">
        <!-- Header -->
        <q-layout-header>

            <q-tabs id="nav">
                <q-route-tab slot="title" icon="person" to="/jobs" replace
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import SideBar from './views/SideBar'
import Add from './components/Add'

@Component({
  components: { Add, SideBar },
})
export default class HelloWorld extends Vue {
  mounted() {}

  @Prop() private showLeft!: boolean
}
</script>


<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  #drawer {
  }
}


#nav {
  padding: 10px;
  background-color: #3d9970;
}
</style>
