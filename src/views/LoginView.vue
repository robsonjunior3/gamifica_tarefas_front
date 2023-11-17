<template>
    <div>
        <h1>Form de login</h1>
        <input type="text" name="apelido" placeholder="Apelido" v-model="apelido">
        <input type="password" name="password" placeholder="Senha" v-model="password">

        <button class="btn-input" type="button" @click.prevent="submit()">Logar</button>
        <div class="msg-sucesso" style="background-color: rgb(38, 123, 38); " v-if="logado">Logado!</div>
    </div>
</template>
  
<style>
    h1 {
        padding: 20px;
    }

    .btn-input {
        width: auto;
        margin-top:10px; 
        border-radius: 5px;
        border-color: blue;
        align-self: center;
        background-color: blue;
        color: white;
        margin-left: 5px;
    }

    .msg-sucesso {
        margin-top: 10px;
        margin-left: 160px;
        display: flex;
        align-self: center;
        width: fit-content;
        background-color: green;
    }

</style>
<script setup>
    import { ref } from 'vue'
    import { userStore } from '/src/stores/UserStore.js'
    const store = userStore();

    const apelido = ref();
    const password = ref();

    const logado = ref(false);

    const submit = () => {
        let user = {
            apelido: apelido.value,
            password: password.value,
        }

        store.login(user);

        logado.value = !logado.value;

        apelido.value = '';//cheyanne40
        password.value = '';
    }
</script>