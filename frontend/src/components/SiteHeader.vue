<template>
<header class="navbar">
<div class="logo">🚔 Car Cartel Manager</div>
<nav class="links">
<router-link
v-for="link in navLinks"
:key="link.path"
:to="link.path"
class="nav-link"
>
{{ link.label }}
</router-link>
</nav>
</header>
</template>


<script setup>
import { reactive } from 'vue'


const navLinks = reactive([
{ label: 'Home', path: '/home' },
{ label: 'Vehículos', path: '/vehicles' }
])
</script>


<style scoped>
.navbar {
background: linear-gradient(90deg, #e0f2fe, #bae6fd);
padding: 1rem 2rem;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid #cbd5e1;
}


.logo {
font-weight: 700;
font-size: 1.2rem;
color: #0f172a;
}


.links {
display: flex;
gap: 1.5rem;
}


.nav-link {
text-decoration: none;
color: #334155;
font-weight: 600;
transition: all 0.2s;
}


.nav-link:hover {
color: #0284c7;
}


.nav-link.router-link-active {
color: #0369a1;
border-bottom: 2px solid #38bdf8;
}
</style>