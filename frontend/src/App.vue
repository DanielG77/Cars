<template>
<div class="frontend-container">
<SiteHeader />
<main class="main-content">
<router-view />
</main>
<SiteFooter />
</div>
</template>


<script setup>
</script>


<style>
body {
margin: 0;
font-family: 'Inter', sans-serif;
background: linear-gradient(135deg, #f8fafc, #e6eef5);
}


.frontend-container {
display: flex;
flex-direction: column;
min-height: 100vh;
}


.main-content {
flex: 1;
padding: 2rem;
max-width: 1100px;
margin: 0 auto;
width: 100%;
}


.card {
background: rgba(255, 255, 255, 0.85);
backdrop-filter: blur(8px);
border: 1px solid #dbe7f0;
padding: 1.8rem;
border-radius: 14px;
box-shadow: 0 10px 25px rgba(180, 200, 220, 0.25);
}


.btn {
padding: 0.7rem 1.4rem;
border-radius: 8px;
border: none;
cursor: pointer;
font-weight: 600;
transition: all 0.25s ease;
}


.btn-primary {
background: linear-gradient(135deg, #7dd3fc, #38bdf8);
color: white;
}


.btn-primary:hover {
transform: translateY(-2px);
box-shadow: 0 8px 20px rgba(56, 189, 248, 0.4);
}
</style>