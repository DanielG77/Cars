<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  radio: String
})

const emit = defineEmits(['update:radio'])
</script>

<template>
  <div class="card">
    <h3>Radiobutton</h3>

    <label>
      <input
        type="radio"
        value="opcion1"
        :checked="radio === 'opcion1'"
        @change="emit('update:radio', 'opcion1')"
      />
      Opción 1
    </label>

    <br />

    <label>
      <input
        type="radio"
        value="opcion2"
        :checked="radio === 'opcion2'"
        @change="emit('update:radio', 'opcion2')"
      />
      Opción 2
    </label>
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
.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  margin-top: 0.25rem;
}
</style>
