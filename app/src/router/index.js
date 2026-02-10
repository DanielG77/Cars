
import { createRouter, createWebHistory } from 'vue-router'
import ClientsView from '../views/ClientsView.vue'
import VehiclesView from '../views/VehiclesView.vue'
import Dashboard from '../views/Dashboard.vue'
import HelloWorld from '../components/HelloWorld.vue' // Keeping original home as option

const routes = [
    { path: '/', redirect: '/clients' },
    { path: '/clients', name: 'Clients', component: ClientsView },
    { path: '/vehicles', name: 'Vehicles', component: VehiclesView },
    { path: '/admin', name: 'Admin', component: Dashboard },
    // Keeping original components accessible
    { path: '/hello', name: 'HelloWorld', component: HelloWorld }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
