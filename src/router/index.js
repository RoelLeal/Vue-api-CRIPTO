import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'
import Calculadora from '../components/calculadora.vue'
import Ganancias from '../components/ganancias.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/calculadora',
    name: 'Calculadora',
    component: Calculadora
  },
  {
    path: '/ganancias',
    name: 'Ganancias',
    component: Ganancias
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
