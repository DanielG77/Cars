
import { reactive, computed } from 'vue'

const state = reactive({
  clients: [],
  vehicles: []
})

export function useCarCartel() {
  
  // --- CLIENTES ---
  const addClient = (client) => {
    state.clients.push({
      id: Date.now(),
      ...client,
      vehicles: [] // Relación con vehículos
    })
  }

  const updateClientStatus = (clientId, newStatus) => {
    const client = state.clients.find(c => c.id === clientId)
    if (client) {
      client.status = newStatus
    }
  }

  const getClientById = (id) => state.clients.find(c => c.id === id)

  // --- VEHÍCULOS ---
  const addVehicle = (vehicle) => {
    state.vehicles.push({
      id: Date.now(),
      ...vehicle
    })
    
    // Vincular al cliente
    const client = state.clients.find(c => c.id === vehicle.clientId)
    if (client) {
      client.vehicles.push(vehicle.id)
    }
  }

  const getVehiclesByClientId = (clientId) => {
    return state.vehicles.filter(v => v.clientId === clientId)
  }

  return {
    state,
    addClient,
    updateClientStatus,
    getClientById,
    addVehicle,
    getVehiclesByClientId
  }
}
