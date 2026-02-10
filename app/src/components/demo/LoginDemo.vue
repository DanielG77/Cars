<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const handleSubmit = () => {
  alert(`Usuario: ${username.value}\nPassword: ${password.value}`)
  // Aquí luego podrías conectar con autenticación real
}
</script>

<template>
  <div class="card">
    <h3>Login</h3>

    <label for="username">Usuario</label>
    <input
      id="username"
      type="text"
      v-model="username"
      placeholder="Ingresa tu usuario"
      class="input"
    />

    <label for="password" style="margin-top: 0.5rem">Password</label>
    <input
      id="password"
      type="password"
      v-model="password"
      placeholder="Ingresa tu password"
      class="input"
    />

    <button class="btn" @click="handleSubmit" style="margin-top: 1rem">
      Iniciar sesión
    </button>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  background: #f5f5f5;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

/* Inputs y selects */
.input {
  display: block;
  padding: 0.5rem;
  margin-top: 0.25rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
  font-size: 1rem;
}

/* Botón */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.btn:hover {
  background-color: #369870;
}
</style>
