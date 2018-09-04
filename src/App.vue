<template>
  <!-- main wrapping component -->
  <q-layout view="hHh Lpr lFf">
    <!-- Header -->
    <q-layout-header>
      <!-- First row of header is a QToolbar -->
      <q-toolbar>
        <!-- showLeft is a model attached to left side drawer below -->
        <q-btn
                flat round dense
                @click="showLeft = !showLeft"
                icon="menu"
        />

        <q-toolbar-title>New Leaf</q-toolbar-title>

      </q-toolbar>

      <!-- Second row of header is a QTabs -->
      <q-tabs>
        <q-route-tab slot="title" icon="person" to="/jobs" replace hide="icon" label="Positions"/>
        <q-route-tab slot="title" icon="map" to="/jobs" replace hide="icon" label="Locations"/>
        <q-route-tab slot="title" icon="home" to="/jobs" replace hide="icon" label="Companies"/>
      </q-tabs>
    </q-layout-header>

    <!-- Left Side Drawer -->
    <q-layout-drawer side="left" v-model="showLeft">
      <q-list no-border link inset-separator>
        <q-item to="/docs">
          <q-item-side icon="computer"/>
          <q-item-main label="Company Name" sublabel="Position Name"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <!-- sub-routes get injected here: -->
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
#app {
  font-family: 'Meslo LG L', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import QToolbarTitle from 'quasar-framework/src/components/toolbar/QToolbarTitle'
export default {
  components: { QToolbarTitle },
}
</script>
