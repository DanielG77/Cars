<script setup>
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="logo">🚔 Car Cartel Manager</div>
      <div class="links">
        <router-link to="/clients">Clientes</router-link>
        <router-link to="/vehicles">Vehículos</router-link>
        <router-link to="/admin">Admin Panel</router-link>
      </div>
    </nav>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* Global styles for the new layout */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f0f2f5;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 1px;
}

.links a {
  color: #aaa;
  text-decoration: none;
  margin-left: 1.5rem;
  font-weight: 500;
  transition: color 0.3s;
}

.links a:hover, .links a.router-link-active {
  color: #42b883;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* Common UI Kit */
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-primary { background: #42b883; color: white; }
.btn-primary:hover { background: #3aa876; }
.btn-danger { background: #e74c3c; color: white; }

.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;}
.form-control {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
}
</style>
