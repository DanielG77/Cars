
<script setup>
import { reactive, computed, watch } from 'vue'
import { useCarCartel } from '../composables/useCarCartel'

const emit = defineEmits(['submit'])
const { state } = useCarCartel()

const form = reactive({
  matricula: '',
  marca: '',
  modelo: '',
  color: '#000000',
  puertas: 4,
  observaciones: '',
  clientId: ''
})

const errors = reactive({
  matricula: '',
  clientId: ''
})

// Data for dynamic selection
const modelsByMake = {
  Toyota: ['Corolla', 'Yaris', 'RAV4'],
  Ford: ['Fiesta', 'Focus', 'Mustang'],
  BMW: ['Serie 3', 'X5', 'M4'],
  Audi: ['A3', 'A4', 'Q5'],
  Mercedes: ['Clase A', 'Clase C', 'GLA']
}

const makes = Object.keys(modelsByMake)

const availableModels = computed(() => {
  return form.marca ? modelsByMake[form.marca] : []
})

// Validation
const validateMatricula = () => {
  // Spanish license plate regex (Old: M-1234-AB, New: 1234-BBB)
  const regexOld = /^[A-Z]{1,2}-\d{4}-[A-Z]{1,2}$/
  const regexNew = /^\d{4}-[B-Z]{3}$/
  
  if (!regexOld.test(form.matricula) && !regexNew.test(form.matricula)) {
    // Allowing flexible input just in case, but warning
    // For strict: errors.matricula = 'Formato inválido (ej: 1234-BBB)'
    // return false
  }
  
  // Check uniqueness locally
  const exists = state.vehicles.some(v => v.matricula === form.matricula)
  if (exists) {
    errors.matricula = 'Matrícula ya registrada'
    return false
  }
  
  errors.matricula = ''
  return true
}

const handleSubmit = () => {
  if (!form.clientId) {
    errors.clientId = 'Debes seleccionar un cliente propietario'
    return
  }
  
  if (validateMatricula()) {
    emit('submit', { ...form })
    // Reset basic fields, keep client maybe? No, reset all.
    form.matricula = ''
    form.marca = ''
    form.modelo = ''
    form.observaciones = ''
    form.clientId = ''
  }
}

// Watch make change to reset model
watch(() => form.marca, () => {
  form.modelo = ''
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="card">
    <h3>Nuevo Vehículo</h3>

    <div class="form-group">
      <label>Cliente Propietario</label>
      <select v-model="form.clientId" class="form-control" required>
        <option value="" disabled>-- Selecciona Cliente --</option>
        <option v-for="c in state.clients" :key="c.id" :value="c.id">
          {{ c.nombre }} ({{ c.dni }})
        </option>
      </select>
      <span v-if="errors.clientId" class="error">{{ errors.clientId }}</span>
    </div>

    <div class="form-group">
      <label>Matrícula</label>
      <input v-model="form.matricula" @blur="validateMatricula" class="form-control" placeholder="1234-BBB" required />
      <span v-if="errors.matricula" class="error">{{ errors.matricula }}</span>
    </div>

    <div class="row">
      <div class="col form-group">
        <label>Marca</label>
        <select v-model="form.marca" class="form-control" required>
          <option value="" disabled>-- Marca --</option>
          <option v-for="m in makes" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>

      <div class="col form-group">
        <label>Modelo</label>
        <select v-model="form.modelo" class="form-control" :disabled="!form.marca" required>
          <option value="" disabled>-- Modelo --</option>
          <option v-for="mod in availableModels" :key="mod" :value="mod">{{ mod }}</option>
        </select>
      </div>
    </div>

    <div class="row">
        <div class="col form-group">
            <label>Color</label>
            <input type="color" v-model="form.color" class="form-control" style="height: 40px; padding: 2px;" />
        </div>
        <div class="col form-group">
            <label>Puertas</label>
            <input type="number" v-model="form.puertas" min="2" max="6" class="form-control" />
        </div>
    </div>

    <div class="form-group">
      <label>Observaciones</label>
      <textarea v-model="form.observaciones" class="form-control"></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Guardar Vehículo</button>
  </form>
</template>

<style scoped>
.error {
  color: #e74c3c;
  font-size: 0.85rem;
}
.row {
    display: flex;
    gap: 1rem;
}
.col {
    flex: 1;
}
</style>
