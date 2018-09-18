<template>
    <q-layout-drawer id="drawer" side="left" v-model="showLeft">
        <q-list no-border link inset-separator>
            <q-item v-for="pos in positions" :to=pos._id>
                <q-item-side icon="computer"/>
                <q-item-main :label=pos.companyName :sublabel=pos.title />
            </q-item>
        </q-list>
    </q-layout-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({
  components: { SideBar },
})
export default class SideBar extends Vue {
  data() {
    return {
      positions: '',
    }
  }

  mounted() {
    axios
      .get('http://localhost:8000/position')
      .then(response => (this.positions = response.data.data))
  }

  @Prop() private showLeft!: boolean
}
</script>

<style scoped>
</style>
