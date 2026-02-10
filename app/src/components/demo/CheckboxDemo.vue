<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  checkbox: Boolean
})

const emit = defineEmits(['update:checkbox'])
</script>

<template>
  <div class="card">
    <h3>Checkbox</h3>
    <label>
      <input
        type="checkbox"
        :checked="checkbox"
        @change="emit('update:checkbox', $event.target.checked)"
      />
      Aceptar condiciones
    </label>
  </div>
</template>


<style scoped>
.card {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  background: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}
</style>
