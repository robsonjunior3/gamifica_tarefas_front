<template>
    <header>
        <button @click="showModal = true" class="btn-div">Cadastrar tarefa</button>
    </header>
    <table class="lista-tarefas">
        <thead style="width: 100%;">
            <tr>
                <th>Titulo</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Situação</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tarefa in tarefas" :key="tarefa.nome">
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

    <div v-if="showModal" class="modal">
        <form class="form-tarefa" >
            <h2 style="text-align: center;">Cadastrar tarefas</h2>
            <label> Nome da Tarefa: </label>
            <input type="text" name="Name" v-model="nome" placeholder="Nome da tarefa"/>
            <label> Descrição da Tarefa: </label>
            <input type="text" name="Name" v-model="descricao" placeholder="Descrição"/>
            <label> Valor da Tarefa: </label>
            <input type="number" name="Name" v-model="pontuacao" placeholder="Pontos"/>
            <div style="align-items: center; justify-content: center; display: flex; gap: 10px;">
                <button type="button" @click.prevent="cadastrarTarefas" class="btn-input">Cadastrar</button>
                <button class="btn-close" @click="showModal = false">Fechar</button>
            </div>
        </form>
    </div>
</template>
  
<style scoped>

.btn-div {
    border-radius: 5px;
    border-color: blue;
    width: auto;
    margin-top: 50px;
    margin-bottom: 8px;
    margin-left: 78.5%;
    background-color: blue;
    color:white;
    white-space: nowrap;
}

.lista-tarefas {
    border: silver solid;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    align-items: center;
    max-width: 1012px;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
    padding: 8px;
}

.btn-close {
    width: auto;
    margin-top:10px; 
    border-radius: 5px;
    border-color: grey;
    align-self: center;
    background-color: grey;
    color:black;
}

.btn-input {
    width: auto;
    margin-top:10px; 
    border-radius: 5px;
    border-color: blue;
    align-self: center;
    background-color: blue;
    color: white;
}

th {
    padding-left: 100px;
    margin-top: -2px;
}

.form-tarefa {
        width: 400px;
        margin-top: -100px;
        padding: 20px;
        z-index: 999;
        border: silver solid;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        align-self: center;
        background-color: rgb(30, 30, 30);
}


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios';
    import { userStore } from '/src/stores/UserStore.js'

    const showModal = ref(false)
    const tarefas = ref('');
    const currentUser = ref(null);
    
    const store = userStore();

    onMounted(async () => {
        // if(store.hasToken()){
        //     currentUser.value = await store.getUser;
        //     carregarTabela();
        // }
        carregarTabela();
    });

    const carregarTabela = () => {
        let url = 'http://127.0.0.1:8000/api/tarefas';

        let configuracao = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 47|Dkji4SRk12SipX7IUZP2KjAJj1ExP9mEPSgyUnaUdb6e1a19',
                // 'Authorization': 'Bearer ' + store.showToken
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
                'Authorization': 'Bearer 47|Dkji4SRk12SipX7IUZP2KjAJj1ExP9mEPSgyUnaUdb6e1a19'
                // 'Authorization': 'Bearer ' + store.showToken
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

    const nome = ref('');
    const descricao = ref('');
    const pontuacao = ref('');

    const cadastrarTarefas = () => {
        let url = 'http://127.0.0.1:8000/api/tarefas/';

        let configuracao = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 47|Dkji4SRk12SipX7IUZP2KjAJj1ExP9mEPSgyUnaUdb6e1a19'
                // 'Authorization': 'Bearer ' + store.showToken
            },
            method: 'post',
            body: JSON.stringify({
                "nome" : nome.value,
                "descricao" : descricao.value,
                "pontuacao" : pontuacao.value
            })
        }
        
        fetch(url, configuracao)
            .then(response => {
                showModal = false;
                alert(response.data, 'Tarefa inserida com sucesso.');
            })
            .catch(errors => {
                console.log(configuracao, errors);
                alert('Tarefa nao cadastrada.')
            });
    }

</script>