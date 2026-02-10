
<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['submit'])

const form = reactive({
  dni: '',
  nombre: '',
  telefono: '',
  email: '',
  status: 'Activo' // Default status
})

const errors = reactive({
  dni: '',
  email: ''
})

const statusOptions = ['Activo', 'Moroso', 'En Proceso', 'Cerrado']

const validateDNI = () => {
  // Simple DNI regex for Spanish DNI/NIE (simplified for demo)
  const dniRegex = /^[XYZ]?\d{5,8}[A-Z]$/
  if (!dniRegex.test(form.dni)) {
    errors.dni = 'Formato de DNI/NIE inválido'
    return false
  }
  errors.dni = ''
  return true
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (form.email && !emailRegex.test(form.email)) {
    errors.email = 'Email inválido'
    return false
  }
  errors.email = ''
  return true
}

const handleSubmit = () => {
  const isDniValid = validateDNI()
  const isEmailValid = validateEmail()

  if (isDniValid && isEmailValid) {
    emit('submit', { ...form })
    // Reset form
    form.dni = ''
    form.nombre = ''
    form.telefono = ''
    form.email = ''
    form.status = 'Activo'
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="card">
    <h3>Nuevo Cliente</h3>
    
    <div class="form-group">
      <label>DNI / NIE</label>
      <input v-model="form.dni" @blur="validateDNI" class="form-control" placeholder="12345678A" required />
      <span v-if="errors.dni" class="error">{{ errors.dni }}</span>
    </div>

    <div class="form-group">
      <label>Nombre Completo</label>
      <input v-model="form.nombre" class="form-control" placeholder="Juan Pérez" required />
    </div>

    <div class="form-group">
      <label>Teléfono</label>
      <input v-model="form.telefono" type="tel" class="form-control" placeholder="+34 600 000 000" />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input v-model="form.email" type="email" @blur="validateEmail" class="form-control" placeholder="juan@ejemplo.com" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <label>Estado de Resolución</label>
      <select v-model="form.status" class="form-control">
        <option v-for="opt in statusOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary">Guardar Cliente</button>
  </form>
</template>

<style scoped>
.error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
}
</style>
