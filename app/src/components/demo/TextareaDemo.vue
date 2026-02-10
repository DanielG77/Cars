<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  textarea: String
})

const emit = defineEmits(['update:textarea'])
</script>

<template>
  <div class="card">
    <h3>Textarea</h3>
    <textarea
      class="input"
      rows="4"
      placeholder="Escribe un texto..."
      :value="textarea"
      @input="emit('update:textarea', $event.target.value)"
    ></textarea>
  </div>
</template>


<style scoped>
.card {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  background: #f5f5f5;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}
.input {
  display: block;
  padding: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
  font-size: 1rem;
  resize: vertical;
}
</style>
