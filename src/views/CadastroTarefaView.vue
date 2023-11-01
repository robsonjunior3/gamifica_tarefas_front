<template>
    <div class="about">
        <label>
            Nome da Tarefa
            <input type="text" name="Name" v-model="nome"/>
        </label>
        <label>
            Descrição da Tarefa
            <input type="text" name="Name" v-model="descricao"/>
        </label>
        <label>
            Pontuação da Tarefa
            <input type="number" name="Name" v-model="pontuacao"/>
        </label>
        <button type="button" @click.prevent="cadastrarTarefas">Enviar</button>
    </div>
</template>
  
<style>
@media (min-width: 1024px) {
.about {
    min-height: 100vh;
    display: flex;
    align-items: center;
}
}
</style>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios';
    import { userStore } from '/src/stores/UserStore.js'

    const store = userStore();

    const nome = ref('');
    const descricao = ref('');
    const pontuacao = ref('');

    const cadastrarTarefas = () => {
        let url = 'http://127.0.0.1:8000/api/tarefas/';

        let configuracao = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + store.showToken
            },
            method: 'post',
            body: JSON.stringify({
                "nome" : nome.value,
                "descricao" : descricao.value,
                "pontuacao" : pontuacao.value
            })
        }
        
        axios(url, configuracao)
            .then(response => {
                console.log('Tarefa inserida com sucesso. Tratar para usuário', configuracao);
            })
            .catch(errors => {
                console.log(configuracao, errors);
            });
    }
</script>