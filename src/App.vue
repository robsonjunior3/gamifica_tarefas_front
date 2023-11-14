<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="div-geral">
    <nav class="navbar">
      <a><RouterLink :to="{name:'home'}">Home</RouterLink></a>
      <a><RouterLink :to="{name:'ranking'}">Ranking</RouterLink></a>
      <a><RouterLink :to="{name:'tarefas'}">Lista de tarefas</RouterLink></a>
      <a><RouterLink :to="{name:'cad_usuario'}">Membros</RouterLink></a>
      <a><RouterLink :to="{name:'about'}">Sobre</RouterLink></a>
    </nav>
    <div class="body">
      <RouterView />
    </div>
  </div>
</template>

<style>

.body {
  width: 100vw;
  padding-top: 50px;
}

.navbar {
  background-color: #333;
  overflow: hidden;
  position: fixed;
  width: 100%;
}

.navbar a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 8px 16px;
  text-decoration: none;
  font-size: 14px;
} 

.navbar a:hover {
  background-color: #008655;
  color: white;
}

.navbar a:active {
  background-color: white;
  color: black;
}

</style>
