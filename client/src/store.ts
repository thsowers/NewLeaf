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
    property: 'position',
    path: ({ _id }) => `/position/${_id}`,
  })
  .get({
    action: 'getPositions',
    property: 'positions',
    path: '/positions',
  })
  .put({
    action: 'addPosition',
    property: 'position',
    path: '/position',
    onSuccess: (state, payload, axios, { params, data }) => {
      state.positions.push(payload.data)
    },
  })
  .post({
    action: 'updatePosition',
    property: 'position',
    path: ({ _id }) => `/position/${_id}`,
  })
  .delete({
    action: 'removePosition',
    property: 'position',
    path: ({ _id }) => `/position/${_id}`,
    onSuccess: (state, payload, axios, { params, data }) => {
      state.positions = state.positions.filter(x => x._id !== params._id)
      // TODO  Go back to closest active position
      history.go(-1)
    },
  })
  .getStore()

export default new Vuex.Store({ ...positions })
