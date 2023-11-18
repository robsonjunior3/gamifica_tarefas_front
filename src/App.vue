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
      <button class="btn-login"><RouterLink :to="{name:'login'}">Login</RouterLink></button>
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
  background-color: rgb(42, 87, 170);
  color: white;
}

.navbar a:active {
  background-color: white;
  color: black;
}

.btn-login {
  margin-left: 610px;
  background-color: rgb(42, 87, 170);
  border-radius: 10px;
  margin-top: 10px
}

</style>
