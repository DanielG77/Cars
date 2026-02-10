<script setup>
defineProps({
  formData: Object,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])
const goBack = () => emit('update:modelValue', 'central')
</script>

<template>
  <div class="card">
    <h2>Resultados del Formulario</h2>

    <p><strong>Input:</strong> {{ formData.input }}</p>
    <p><strong>Checkbox:</strong> {{ formData.checkbox }}</p>
    <p><strong>Datetime:</strong> {{ formData.datetime }}</p>
    <p><strong>Textarea:</strong> {{ formData.textarea }}</p>
    <p><strong>Radiobutton:</strong> {{ formData.radio }}</p>

    <button class="btn" @click="goBack">
      ← Volver a CentralComponents
    </button>
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

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.btn:hover {
  background-color: #369870;
}
</style>
