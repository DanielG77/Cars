<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  input: String
})

const emit = defineEmits(['update:input'])
</script>

<template>
  <div class="card">
    <h3>Input</h3>
    <input
      type="text"
      class="input"
      placeholder="Escribe algo..."
      :value="input"
      @input="emit('update:input', $event.target.value)"
    />
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

.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;
}
</style>
