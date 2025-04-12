<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li class="nav-item"><a href="#home">Home</a></li>
      <li class="nav-item"><a href="#about">About</a></li>
      <li class="nav-item"><a href="#services">Services</a></li>
      <li class="nav-item"><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({});
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 1rem;
}

.nav-list {
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
}

.nav-item a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

.nav-item a:hover {
  text-decoration: underline;
}
</style>
