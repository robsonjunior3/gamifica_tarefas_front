<template>
    <div>
        <h1>Form de cadastro de usuario</h1>
        <label>
            Nome do Usuario
            <input type="text" name="nome" v-model="nome"/>
        </label>
        <br />
        <label>
            Apelido do Usuario
            <input type="text" name="apelido" v-model="apelido"/>
        </label>
        <br />
        <label>
            Senha do Usuario
            <input type="text" name="senha" v-model="senha"/>
        </label>
        <br />
        <label>
            Nível do Usuario
            <input type="number" name="nivel" v-model="nivel"/>
        </label>
        <br />
        <button type="button" @click.prevent="submit()">enviar</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { userStore } from '/src/stores/UserStore.js';

    const store = userStore();

    const nome = ref('');
    const senha = ref('');
    const apelido = ref('');
    const nivel = ref('');

    const submit = () => {
        let url = 'http://127.0.0.1:8000/api/usuarios/';

        let configuracao = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + store.showToken
            },
            method: 'post',
            body: JSON.stringify({
                "nome" : nome.value,
                "senha" : senha.value,
                "apelido" : apelido.value,
                "nivel" : nivel.value
            })
        }
        
        axios.post(url, configuracao)
            .then(response => {
                response = 21;
                console.log('Usuário inserido com sucesso. Tratar para o usuário', configuracao);
            })
            .catch(error => {
                console.log(error.message);
            });
    }
</script>