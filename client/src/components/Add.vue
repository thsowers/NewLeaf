<template>
    <div>
        <q-btn id="add"
               rounded push
               color="secondary"
               size="lg"
               icon="add"
               @click="openModal"
        />
        <q-modal dark v-model="opened"
                 :content-css="{minWidth: '80vw', minHeight: '10vh'}">
            <q-modal-layout dark class="addPosition">
                <q-toolbar dark slot="header">
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

                <form class="layout-padding">
                    <div style="display: flex;" id="newPosition">
                        <q-input dark v-model="title" float-label="Title"/>
                        <q-input dark v-model="company" float-label="Company"/>
                        <q-input dark v-model="source" float-label="Source"/>
                    </div>
                    <q-btn @click="addJob" type="submit" id="submit" color="primary"
                           label="Add New" icon="add"/>
                </form>
            </q-modal-layout>
        </q-modal>
    </div>
</template>

<script lang="ts">
import QBtn from 'quasar-framework/src/components/btn/QBtn'
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState, mapActions } from 'vuex'

@Component({
  components: { QBtn },
  computed: mapState({
    positions: state => state.positions,
  }),
  methods: {
    ...mapActions(['addPosition', 'removePosition']),
  },
  props: ['_id'],
})
export default class Add extends Vue {
  opened: boolean = false
  title = ''
  company = ''
  source = ''

  openModal() {
    this.opened = true
  }

  addJob() {
    console.log('removing')
    const { title, company, source } = this.$data
    this.addPosition({
      data: { title: title, company: company, source: source },
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

.addPosition {
  background-color: rgba(53, 55, 64, 0.96) !important;
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
