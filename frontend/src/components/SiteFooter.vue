<template>
<footer class="site-footer">
© {{ year }} Car Cartel Manager — Diseño Silver Edition
</footer>
</template>


<script setup>
import { ref } from 'vue'
const year = ref(new Date().getFullYear())
</script>


<style scoped>
.site-footer {
background: #e2e8f0;
color: #334155;
padding: 1rem;
text-align: center;
border-top: 1px solid #cbd5e1;
}
</style>