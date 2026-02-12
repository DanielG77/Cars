import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Vehicles from '../views/Vehicles.vue'


const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/vehicles', name: 'Vehicles', component: Vehicles }
]


const router = createRouter({ history: createWebHistory(), routes })
export default router