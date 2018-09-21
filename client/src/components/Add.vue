<template>
    <div>
        <q-btn id="add"
               rounded push
               color="secondary"
               size="lg"
               icon="add"
               @click="openModal"
        />
        <q-modal v-model="opened"
                 :content-css="{minWidth: '80vw', minHeight: '10vh'}">
            <q-modal-layout>
                <q-toolbar slot="header">
                    <q-btn
                            flat
                            round
                            dense
                            v-close-overlay
                            icon="cancel"
                    />
                    <q-toolbar-title>
                        Add New Position
                    </q-toolbar-title>
                </q-toolbar>

                <div class="layout-padding">
                    <div style="display: flex;" id="newPosition">
                        <q-input v-model="title" float-label="Title"/>
                        <q-input v-model="description" float-label="Company"/>
                    </div>
                    <q-btn @click="addJob" id="submit" color="primary" label="Add New" icon="add" />
                </div>
            </q-modal-layout>
        </q-modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import QBtn from 'quasar-framework/src/components/btn/QBtn'
import axios from 'axios'

@Component({
  components: { QBtn },
})
export default class Add extends Vue {
  opened: boolean = false
  title = ''
  description = ''

  openModal() {
    this.opened = true
  }

  addJob() {
    axios.post('http://localhost:8000/position', {
      title: this.title,
      description: this.description,
    })
  }
}
</script>

<style scoped lang="scss">
#newPosition {
  .q-input {
    margin-left: 20px;
    width: 300px;
  }
}

#submit {
  margin: 20px;
}
#add {
  position: absolute;
  right: 16px;
  top: 20px;
}
</style>
