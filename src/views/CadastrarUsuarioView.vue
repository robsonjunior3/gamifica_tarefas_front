<template>
    <div>
        <h1>Membros</h1>
    </div>
    <header>
        <button @click="showModal = true" class="btn-div">Cadastrar Usuario</button>
    </header>
    <table class="lista-usuarios">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Apelido</th>
                <th>Nivel</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id" :id="'id_' + usuario.id">
                <td>{{ usuario.nome }}</td>
                <td>{{ usuario.apelido }}</td>
                <td>{{ usuario.nivel }}</td>
                <td><button @click="showEditModal=true;editarUsuarioForm(usuario)" class="btn-input">Editar</button></td>
                <td><button @click="excluirUsuario(usuario)" class="btn-input">Excluir</button></td>
            </tr>
        </tbody>
    </table>

    <div v-if="showModal" class="modal">
        <form class="form-usuario" >
            <h2 style="text-align: center;">Cadastrar usuário</h2>
            <label> Usuário: </label>
            <input type="text" name="nome" v-model="nome" placeholder="Nome do usuário"/>
            <label> Apelido: </label>
            <input type="text" name="apelido" v-model="apelido" placeholder="Apelido"/>
            <label> Senha: </label>
            <input type="text" name="senha" v-model="senha" placeholder="Senha"/>
            <label> Nível: </label>
            <input type="number" name="nivel" v-model="nivel" placeholder="Nível"/>

            <div style="align-items: center; justify-content: center; display: flex; gap: 10px;">
                <button type="button" @click.prevent="cadastrarUsuario()" class="btn-input">Cadastrar</button>
                <button class="btn-close" @click="showModal = false">Fechar</button>
            </div>
        </form>
    </div>

    <!-- edit model -->
    <div v-if="showEditModal" class="modal">
        <form class="form-usuario" >
            <h2 style="text-align: center;">Cadastrar usuário</h2>
            <label> Usuário: </label>
            <input type="text" name="nome" v-model="nome" placeholder="Nome do usuário"/>
            <label> Apelido: </label>
            <input type="text" name="apelido" v-model="apelido" placeholder="Apelido"/>
            <label> Senha: </label>
            <input type="text" name="senha" v-model="senha" placeholder="Senha"/>
            <label> Nível: </label>
            <input type="number" name="nivel" v-model="nivel" placeholder="Nível"/>

            <div style="align-items: center; justify-content: center; display: flex; gap: 10px;">
                <button type="button" @click.prevent="editarUsuarioSubmit(id)" class="btn-input">Editar</button>
                <button class="btn-close" @click="showEditModal = false">Fechar</button>
            </div>
        </form>
    </div>

</template>

<style scoped>

h1 {
    padding: 20px;
}

.btn-div {
    border-radius: 5px;
    border-color: blue;
    width: auto;
    margin-top: 0px;
    margin-bottom: 8px;
    margin-left: 77.9%;
    background-color: blue;
    color:white;
    white-space: nowrap;
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

.lista-usuarios {
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

th {
    padding-left: 100px;
    margin-top: -2px;
}

.form-usuario {
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
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { userStore } from '/src/stores/UserStore.js';
    const store = userStore();

    var showModal = ref(false);
    var showEditModal = ref(false);
    
    const usuarios = ref('');
    
    const nome = ref('');
    const senha = ref('');
    const apelido = ref('');
    const nivel = ref('');
    const currentUser = ref('');

    const id = ref('');

    onMounted(async () => {
        if(store.hasToken()){
            currentUser.value = await store.getUser;
            carregarTabela();
        }
        // carregarTabela();
    });

    const carregarTabela = () => {
        let url = 'http://127.0.0.1:8000/api/usuarios/';
        let configuracao = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + store.showToken
            },
            method: 'get'
        }

        axios.get(url, configuracao)
            .then(response => {
                usuarios.value = response.data.data;
            })
            .catch();
    }
    
    const cadastrarUsuario = () => {
        let url = 'http://127.0.0.1:8000/api/usuarios/';
        const headers = {
            'Authorization': 'Bearer 6|sTmYOfs8oLXfbaBJW0vPvQ8vEDzgE9s8caMzmy1wbe47e41c',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const data = new URLSearchParams();
        data.append('nome', nome.value);
        data.append('apelido', apelido.value);
        data.append('password', senha.value);
        data.append('nivel', nivel.value);

        axios.post(url, data, { headers })
        .then(() => {
            showModal = false;
            usuarios.value.push({nome:nome.value,apelido:apelido.value,password:senha.value,nivel:nivel.value})
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
    }

    const editarUsuarioForm = (user) => {
        id.value = user.id;
        nome.value = user.nome;
        apelido.value = user.apelido;
        senha.value = user.senha;
        nivel.value = user.nivel;
    }

    const editarUsuarioSubmit = (id) => {
        let url = 'http://127.0.0.1:8000/api/usuarios/' + id;
        const headers = {
            // 'Authorization': 'Bearer 6|sTmYOfs8oLXfbaBJW0vPvQ8vEDzgE9s8caMzmy1wbe47e41c',
            'Authorization': 'Bearer ' + store.showToken,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const data = new URLSearchParams();
        data.append('nome', nome.value);
        data.append('apelido', apelido.value);
        data.append('password', senha.value);
        data.append('nivel', nivel.value);

        axios.put(url, data, { headers })
        .then(response => {
            showEditModal = false;
            let pos = usuarios.value.findIndex(usuario => usuario.id === id);
            usuarios.value[pos] = response.data.data;
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
    }

    const excluirUsuario = (usuario) => {

        if (confirm("Realmente deseja excluir o usuário "+usuario.nome+"?") == true) {
            let url = 'http://127.0.0.1:8000/api/usuarios/' + usuario.id;
            let configuracao = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + store.showToken
                },
                method: 'delete'
            }

            axios.delete(url, configuracao)
                .then(response => {
                    console.log(response);
                    const rowElement = document.getElementById('id_' + usuario.id);
                    if (rowElement)
                        rowElement.style.backgroundColor = 'red';
                })
                .catch();
        }
    }

</script>