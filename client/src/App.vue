<template>
  <!-- main wrapping component -->
  <q-layout view="hHh Lpr lFf" id="app">
    <!-- Header -->
    <q-layout-header>

      <q-tabs id="nav">
        <q-route-tab slot="title" icon="person" to="/jobs" replace hide="icon" label="Positions"/>
        <q-route-tab slot="title" icon="map" to="/map" replace hide="icon" label="Locations"/>
        <q-route-tab slot="title" icon="home" to="/company" replace hide="icon" label="Companies"/>
      </q-tabs>
    </q-layout-header>

    <q-layout-drawer id="drawer" side="left" v-model="showLeft">
      <q-list no-border link inset-separator>
        <q-item to="/docs">
          <q-item-side icon="computer"/>
          <q-item-main label="Company Name" sublabel="Position Name"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  mounted() {
    const { Todo } = this.$FeathersVuex
    const todo = new Todo({ description: 'Do something!' })
    console.log(todo)
    console.log(todo.save()) // --> Creates the todo on the server.
  }

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
