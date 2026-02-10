
<script setup>
import { computed, ref } from 'vue'
import { useCarCartel } from '../composables/useCarCartel'
import ClienteForm from '../components/ClienteForm.vue'

const { state, addClient } = useCarCartel()
const showForm = ref(false)

const clients = computed(() => state.clients)

const handleCreate = (clientData) => {
  addClient(clientData)
  showForm.value = false
}
</script>

<template>
  <div class="clients-view">
    <div class="header-actions">
      <h1>Gestión de Clientes</h1>
      <button @click="showForm = !showForm" class="btn btn-primary">
        {{ showForm ? 'Cancelar' : 'Nuevo Cliente' }}
      </button>
    </div>

    <div v-if="showForm" class="form-container">
      <ClienteForm @submit="handleCreate" />
    </div>

    <div class="clients-list">
      <div v-if="clients.length === 0" class="empty-state">
        No hay clientes registrados.
      </div>
      
      <div v-else class="grid">
        <div v-for="client in clients" :key="client.id" class="card client-card">
          <div class="card-header">
            <h3>{{ client.nombre }}</h3>
            <span class="badge" :class="client.status.toLowerCase().replace(' ', '-')">{{ client.status }}</span>
          </div>
          <p><strong>DNI:</strong> {{ client.dni }}</p>
          <p><strong>Tel:</strong> {{ client.telefono }}</p>
          <p><strong>Email:</strong> {{ client.email || 'N/A' }}</p>
          <p><strong>Vehículos:</strong> {{ client.vehicles.length }}</p>
        </div>
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

.clients-list {
  margin-top: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.client-card {
  margin-bottom: 0; /* Override generic card margin */
  border-left: 4px solid #42b883;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  background: #eee;
}

.badge.activo { background: #e8f5e9; color: #2e7d32; }
.badge.moroso { background: #ffebee; color: #c62828; }
.badge.en-proceso { background: #fff8e1; color: #f9a825; }

.empty-state {
  text-align: center;
  color: #888;
  padding: 2rem;
}
</style>
