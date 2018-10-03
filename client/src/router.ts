import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Position from './views/Position.vue'
import Location from './views/Location.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/position/:_id',
      component: Position,
      props: true,
    },
    {
      path: '/map/',
      component: Location,
      props: true,
    },
  ],
})
