import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Over from './components/home/Over.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/over',
    name: "over",
    component: Over
  }]
})