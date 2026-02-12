<template>
  <div class="vehicle-card">
    <div class="card-header">
      <div class="badge">🚗</div>
      <h2>Comprobar vehículo</h2>
    </div>

    <p class="description">Rellena los datos del vehículo y pulsa <strong>Comprobar</strong>. El backend devolverá <code>true</code> o <code>false</code>.</p>

    <form @submit.prevent="onSubmit" class="vehicle-form">
      <div class="form-row">
        <label>Marca</label>
        <input v-model="form.make" class="form-control" placeholder="p.ej. Toyota" />
      </div>

      <div class="form-row">
        <label>Modelo</label>
        <input v-model="form.model" class="form-control" placeholder="p.ej. Corolla" />
      </div>

      <div class="form-row">
        <label>Matrícula</label>
        <input v-model="form.plate" class="form-control" placeholder="p.ej. 1234ABC" />
      </div>

      <div class="actions">
        <button class="btn btn-primary" :disabled="loading" type="submit">Comprobar</button>
        <button class="btn btn-ghost" type="button" @click="resetForm">Limpiar</button>
      </div>
    </form>

    <div v-if="loading" class="status">Comprobando...</div>

    <div v-if="result !== null" class="status">
      <div v-if="result === true" class="result result-true">✅ El vehículo existe (true)</div>
      <div v-else class="result result-false">❌ No existe (false)</div>
    </div>

    <div v-if="error" class="error">Error: {{ error }}</div>

    <footer class="card-footer">Comprobación vía API • Datos tratados localmente</footer>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { checkVehicle } from '../router/vehicleService'

const form = reactive({ make: '', model: '', plate: '' })
const loading = ref(false)
const result = ref(null)
const error = ref(null)

function resetForm() {
  form.make = ''
  form.model = ''
  form.plate = ''
  result.value = null
  error.value = null
}

async function onSubmit() {
  error.value = null
  result.value = null
  loading.value = true
  try {
    const exists = await checkVehicle({ ...form })
    result.value = exists === true
  } catch (err) {
    console.error(err)
    error.value = err?.message || String(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:root{
  --white: #ffffff;
  --blue-600: #2563eb; /* azul vivo */
  --blue-800: #1e40af; /* azul oscuro */
  --silver: #cbd5e1; /* plateado claro */
  --silver-2: #e6eef8; /* plateado muy suave */
  --black-sparse: #0b1220; /* negro usado con moderación */
}

.vehicle-card{
  max-width:680px;
  margin:1.25rem auto;
  background: linear-gradient(180deg, var(--white) 0%, var(--silver-2) 100%);
  border: 1px solid rgba(30,64,175,0.06); /* very subtle blue border */
  box-shadow: 0 6px 20px rgba(16,24,40,0.06), inset 0 1px 0 rgba(255,255,255,0.6);
  border-radius:14px;
  padding:1.25rem 1.5rem;
  color: var(--black-sparse);
  font-family: Inter, Roboto, system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial;
}

.card-header{
  display:flex;
  align-items:center;
  gap:0.75rem;
  margin-bottom:0.5rem;
}

.card-header h2{
  margin:0;
  font-size:1.25rem;
  color:var(--blue-800);
  letter-spacing: -0.2px;
}

.badge{
  width:42px;
  height:42px;
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: linear-gradient(135deg, var(--blue-600), var(--blue-800));
  color: white;
  box-shadow: 0 6px 18px rgba(37,99,235,0.18);
  font-size:18px;
}

.description{
  margin:0.25rem 0 1rem 0;
  color:#334155;
  font-size:0.95rem;
}

.vehicle-form{
  display:grid;
  grid-template-columns:1fr;
  gap:0.75rem;
}

.form-row{
  display:flex;
  flex-direction:column;
}

.form-row label{
  font-size:0.85rem;
  margin-bottom:0.35rem;
  color:#0f172a;
  opacity:0.85;
}

.form-control{
  width:100%;
  padding:0.65rem 0.75rem;
  border-radius:10px;
  border:1px solid var(--silver);
  background: linear-gradient(180deg, var(--white), #fbfdff);
  outline:none;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
  transition: border-color 150ms ease, box-shadow 150ms ease, transform 80ms ease;
  font-size:0.95rem;
}

.form-control::placeholder{ color:#94a3b8 }

.form-control:focus{
  border-color: var(--blue-600);
  box-shadow: 0 6px 18px rgba(37,99,235,0.12);
  transform: translateY(-1px);
}

.actions{
  display:flex;
  gap:0.5rem;
  margin-top:0.25rem;
}

.btn{
  padding:0.6rem 1rem;
  border-radius:10px;
  font-weight:600;
  border:1px solid transparent;
  cursor:pointer;
  min-width:110px;
}

.btn:disabled{ opacity:0.6; cursor:not-allowed }

.btn-primary{
  background: linear-gradient(180deg, var(--blue-600), var(--blue-800));
  color: white;
  box-shadow: 0 8px 24px rgba(30,64,175,0.18);
  border: 1px solid rgba(255,255,255,0.06);
}

.btn-primary:hover:not(:disabled){
  transform: translateY(-2px);
}

.btn-ghost{
  background: transparent;
  color: var(--blue-800);
  border: 1px solid var(--silver);
}

.status{ margin-top:0.9rem; font-size:0.95rem }

.result{
  padding:0.7rem 0.9rem;
  border-radius:10px;
  font-weight:600;
}

.result-true{ background: linear-gradient(90deg, rgba(226,252,231,1), rgba(246,255,244,1)); color:#0f5132; border:1px solid rgba(34,197,94,0.12) }

.result-false{ background: linear-gradient(90deg, rgba(255,241,242,1), rgba(255,248,249,1)); color:#7f1d1d; border:1px solid rgba(239,68,68,0.08) }

.error{ margin-top:0.75rem; color:#b91c1c; font-weight:600 }

.card-footer{
  margin-top:1rem;
  font-size:0.82rem;
  color:#475569;
  border-top:1px dashed rgba(148,163,184,0.12);
  padding-top:0.75rem;
}

/* Responsive */
@media (max-width:520px){
  .vehicle-card{ padding:1rem }
  .badge{ width:38px; height:38px }
}
</style>
