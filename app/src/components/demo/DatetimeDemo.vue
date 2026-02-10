<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  datetime: String
})

const emit = defineEmits(['update:datetime'])
</script>

<template>
  <div class="card">
    <h3>Datetime</h3>
    <input
      type="datetime-local"
      class="input"
      :value="datetime"
      @input="emit('update:datetime', $event.target.value)"
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
