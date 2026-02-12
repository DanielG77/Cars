
<script setup>
import { computed, ref } from 'vue'
import { useCarCartel } from '../composables/useCarCartel'

const { state, updateClientStatus, getVehiclesByClientId } = useCarCartel()

const filterStatus = ref('Todos')
const statusOptions = ['Todos', 'Activo', 'Moroso', 'En Proceso', 'Cerrado']

const filteredClients = computed(() => {
  if (filterStatus.value === 'Todos') {
    return state.clients
  }
  return state.clients.filter(c => c.status === filterStatus.value)
})

const getClientVehicles = (clientId) => {
  return getVehiclesByClientId(clientId)
}

const changeStatus = (client, newStatus) => {
  updateClientStatus(client.id, newStatus)
}
</script>

<template>
  <div class="dashboard-view">
    <h1>Panel Administrativo</h1>

    <div class="filters card">
      <label>Filtrar por Estado:</label>
      <div class="status-filters">
        <button 
          v-for="opt in statusOptions" 
          :key="opt"
          @click="filterStatus = opt"
          class="btn-filter"
          :class="{ active: filterStatus === opt }"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <div class="table-container card">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Contacto</th>
            <th>Estado</th>
            <th>Vehículos Asociados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredClients.length === 0">
            <td colspan="5" class="empty-state">No se encontraron clientes con este filtro.</td>
          </tr>
          <tr v-for="client in filteredClients" :key="client.id">
            <td>
              <div class="client-name">{{ client.nombre }}</div>
              <div class="client-dni">{{ client.dni }}</div>
            </td>
            <td>
              <div>{{ client.email }}</div>
              <div>{{ client.telefono }}</div>
            </td>
            <td>
              <span class="badge" :class="client.status.toLowerCase().replace(' ', '-')">
                {{ client.status }}
              </span>
            </td>
            <td>
              <ul class="vehicle-list">
                <li v-for="v in getClientVehicles(client.id)" :key="v.id">
                  {{ v.matricula }} ({{ v.marca }})
                </li>
                <li v-if="getClientVehicles(client.id).length === 0" class="text-muted">Sin vehículos</li>
              </ul>
            </td>
            <td>
              <select 
                :value="client.status" 
                @change="changeStatus(client, $event.target.value)"
                class="status-select"
              >
                <option v-for="opt in statusOptions.slice(1)" :key="opt" :value="opt">
                  {{ opt }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view h1 {
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-filters {
  display: flex;
  gap: 0.5rem;
}

.btn-filter {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-filter.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th, .admin-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
  vertical-align: top;
}

.admin-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #444;
}

.client-name { font-weight: bold; }
.client-dni { font-size: 0.85rem; color: #666; }

.vehicle-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
}

.text-muted { color: #888; font-style: italic; }

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}
.badge.activo { background: #e8f5e9; color: #2e7d32; }
.badge.moroso { background: #ffebee; color: #c62828; }
.badge.en-proceso { background: #fff8e1; color: #f9a825; }
.badge.cerrado { background: #e0e0e0; color: #616161; }

.status-select {
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.empty-state { text-align: center; color: #888; padding: 2rem; }
</style>
