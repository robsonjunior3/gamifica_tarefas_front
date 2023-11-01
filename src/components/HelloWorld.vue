<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">Gamifica Tarefas</h1>
    <h3>
      Gamifica Tarefas é a revolução na gestão de tarefas. Supervisores criam desafios com pontuações, enquanto equipes se unem para concluí-los e ganhar pontos, subindo no ranking. Transforme o trabalho em diversão e impulsione a produtividade! 🚀 #GamificaçãoTarefas
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
