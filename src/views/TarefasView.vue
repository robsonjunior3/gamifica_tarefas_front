<template>
    <div class="about">
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>Pontos</th>
                    <th>Situação</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="tarefa in tarefas"
                    :key="tarefa.nome"
                >
                    <td>{{ tarefa.nome }}</td>
                    <td>{{ tarefa.descricao }}</td>
                    <td>{{ tarefa.pontuacao }}</td>
                    <td>{{ tarefa.concluida ? 'Concluída' : 'Não concluída' }}</td>
                    <td>
                        <button @click.prevent="vincularTarefa(tarefa.id)">Vincular-se</button>
                    </td>
                    <td v-if="tarefa.responsavel_id && currentUser && tarefa.responsavel_id == currentUser.id">
                        <button @click.prevent="concluirTarefa(tarefa.id)">Concluir</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <button @click.prevent="carregarTabela">+</button> -->
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

    const tarefas = ref('');
    const currentUser = ref(null);

    onMounted(async () => {
        if(store.hasToken()){
            currentUser.value = await store.getUser;
            carregarTabela();
        }
    });

    const carregarTabela = () => {
        let url = 'http://127.0.0.1:8000/api/tarefas';

        let configuracao = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + store.showToken
            },
        }

        axios.get(url, configuracao)
            .then(response => {
                tarefas.value = response.data.data;
            })
            .catch(errors => {
                console.log(errors);
            })
    }

    const vincularTarefa = (tarefaId) => {
        let url = 'http://127.0.0.1:8000/api/associar-tarefa/' + tarefaId;
        
        let configuracao = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + store.showToken
            },
            method: 'put'
        }

        fetch(url, configuracao)
            .then(() => {
                let pos = tarefas.value.findIndex(tarefa => tarefa.id === tarefaId);
                tarefas.value[pos].responsavel_id = currentUser._rawValue.id;
            })
            .catch(errors => {
                console.log(errors);
            })
    }
    const concluirTarefa = (tarefaId) => {
        let url = 'http://127.0.0.1:8000/api/concluir-tarefa/' + tarefaId;
        
        let configuracao = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + store.showToken
            },
            method: 'put'
        }

        fetch(url, configuracao)
            .then(() => {
                let pos = tarefas.value.findIndex(tarefa => tarefa.id === tarefaId);
                tarefas.value[pos].concluida = true;
            })
            .catch(errors => {
                console.log(errors);
            })
    }
</script>