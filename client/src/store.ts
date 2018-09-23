import Vue from 'vue'
import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'

Vue.use(Vuex)

const positions = new Vapi({
  baseURL: 'http://localhost:3000/',
  state: {
    positions: [],
  },
})
  .get({
    action: 'getPosition',
    property: 'positions',
    path: ({ id }) => `/position/${id}`,
  })
  .get({
    action: 'getPositions',
    property: 'positions',
    path: '/positions',
  })
  .post({
    action: 'updatePosition',
    property: 'position',
    path: ({ id }) => `/position/${id}`,
  })
  .delete({
    action: 'removePosition',
    property: 'position',
    path: ({ id }) => `/position/${id}`,
    onSuccess: (state, payload, axios, { params, data }) => {
      // if you set the onSuccess function you have to set the state manually
      console.log(data)
      console.log(params)
      console.log(state)
      console.log(payload)
      console.log(axios)
      state.posts = payload.data
      state.post = payload.data[0]
    },
  })
  .getStore()

export default new Vuex.Store({ ...positions })
