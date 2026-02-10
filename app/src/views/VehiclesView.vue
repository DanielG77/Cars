
<script setup>
import { computed, ref } from 'vue'
import { useCarCartel } from '../composables/useCarCartel'
import VehiculoForm from '../components/VehiculoForm.vue'

const { state, addVehicle, getClientById } = useCarCartel()
const showForm = ref(false)

const vehicles = computed(() => state.vehicles)

const getClientName = (id) => {
  const c = getClientById(id)
  return c ? c.nombre : 'Desconocido'
}

const handleCreate = (vehicleData) => {
  addVehicle(vehicleData)
  showForm.value = false
}
</script>

<template>
  <div class="vehicles-view">
    <div class="header-actions">
      <h1>Gestión de Vehículos</h1>
      <button @click="showForm = !showForm" class="btn btn-primary">
        {{ showForm ? 'Cancelar' : 'Nuevo Vehículo' }}
      </button>
    </div>

    <div v-if="showForm" class="form-container">
      <VehiculoForm @submit="handleCreate" />
    </div>

    <div class="vehicles-list">
        <div v-if="vehicles.length === 0" class="empty-state">
            No hay vehículos registrados.
        </div>

        <div v-else class="table-container card">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Matrícula</th>
                        <th>Marca/Modelo</th>
                        <th>Color</th>
                        <th>Propietario</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="v in vehicles" :key="v.id">
                        <td class="matricula">{{ v.matricula }}</td>
                        <td>{{ v.marca }} {{ v.modelo }}</td>
                        <td>
                            <span class="color-dot" :style="{ backgroundColor: v.color }"></span>
                            {{ v.color }}
                        </td>
                        <td>
                            <router-link to="/clients">{{ getClientName(v.clientId) }}</router-link>
                        </td>
                        <td>{{ v.observaciones || '-' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.table-container {
    padding: 0;
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th, .data-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.data-table th {
    background-color: #f9f9f9;
    font-weight: 600;
}

.matricula {
    font-family: monospace;
    font-weight: bold;
    background: #fff;
    border: 1px solid #ddd;
    padding: 2px 6px;
    border-radius: 4px;
}

.color-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #ddd;
    margin-right: 5px;
    vertical-align: middle;
}

.empty-state {
    text-align: center;
    color: #888;
    padding: 2rem;
}
</style>
