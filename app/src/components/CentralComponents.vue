<script setup>
import { defineProps, defineEmits, ref, computed, reactive } from 'vue'

import InputDemo from './demo/InputDemo.vue'
import CheckboxDemo from './demo/CheckboxDemo.vue'
import DatetimeDemo from './demo/DatetimeDemo.vue'
import LoginDemo from './demo/LoginDemo.vue'
import RadioDemo from './demo/RadioDemo.vue'
import TextareaDemo from './demo/TextareaDemo.vue'

defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue', 'submit-form'])

/* selector de demo */
const selected = ref('')

const componentsMap = {
  input: InputDemo,
  checkbox: CheckboxDemo,
  datetime: DatetimeDemo,
  radio: RadioDemo,
  textarea: TextareaDemo,
  login: LoginDemo,
}

const currentComponent = computed(() => componentsMap[selected.value])

/* 🔹 estado CENTRAL del formulario */
const formData = reactive({
  input: '',
  checkbox: false,
  datetime: '',
  radio: '',
  textarea: '',
})

/* 🔹 submit */
const submitForm = () => {
  emit('submit-form', { ...formData })
  emit('update:modelValue', 'resultados')
}

/* volver a home */
const goBack = () => emit('update:modelValue', 'home')
</script>

<template>
  <div>
    <h2>Central Components</h2>

    <!-- selector -->
    <div class="card">
      <label>Selecciona un componente:</label>
      <select v-model="selected" class="input">
        <option disabled value="">-- Escoge uno --</option>
        <option value="input">Input</option>
        <option value="checkbox">Checkbox</option>
        <option value="datetime">Datetime</option>
        <option value="radio">Radiobutton</option>
        <option value="textarea">Textarea</option>
        <option value="login">Login</option>
      </select>
    </div>

    <!-- componente dinámico -->
    <div v-if="currentComponent">
      <component
        :is="currentComponent"
        :key="selected"
        v-model:input="formData.input"
        v-model:checkbox="formData.checkbox"
        v-model:datetime="formData.datetime"
        v-model:radio="formData.radio"
        v-model:textarea="formData.textarea"
      />
    </div>

    <!-- submit -->
    <div class="card" style="text-align:center">
      <button class="btn" @click="submitForm">Submit</button>
    </div>

    <!-- volver -->
    <div class="card" style="text-align:center">
      <button class="btn" @click="goBack">← Volver a HelloWorld</button>
    </div>
  </div>
</template>



<style scoped>
.central-container {
  padding: 1rem;
}

/* Contenedor tipo card */
.card {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  background: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

/* Inputs y selects */
.input {
  display: block;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
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

/* Contenedor del componente dinámico */
.component-preview {
  margin-top: 1rem;
}
</style>
