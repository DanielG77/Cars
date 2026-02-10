<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import CentralComponents from './components/CentralComponents.vue'
import Resultados from './components/Resultados.vue'

const currentView = ref('home')
const formData = ref({})
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <HelloWorld
    v-if="currentView === 'home'"
    v-model="currentView"
    msg="Vite + Vue"
  />

  <CentralComponents
    v-else-if="currentView === 'central'"
    v-model="currentView"
    v-model:formData="formData"
    @submit-form="formData = $event"
  />

  <Resultados
    v-else-if="currentView === 'resultados'"
    :form-data="formData"
    v-model="currentView"
  />
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
