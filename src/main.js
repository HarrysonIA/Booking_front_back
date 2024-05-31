import './assets/main.css'


import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SendMessage from 'C:/Users/HarrysonDanielGuerre/Documents/Booking/Booking-front/src/components/SendMessage.vue'

const routes = [
  {
    path: '/components/SendMessage.vue',
    component: SendMessage
  }
  // Otras rutas aquí si es necesario
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


createApp(App).mount('#app')

