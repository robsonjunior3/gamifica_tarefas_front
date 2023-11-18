<template>
    <div class="div-body">
        <div class="form">
            <h3>Login</h3>
            <label>Apelido:</label>
            <input type="text" name="apelido" placeholder="Apelido" v-model="apelido">
            <label>Senha:</label>
            
            <input type="password" name="password" placeholder="Senha" v-model="password">
            
            <button class="btn-input" type="button" @click.prevent="submit()">Logar</button>
        </div>
        <span class="msg-sucesso" style="background-color: rgb(38, 123, 38); " v-if="logado">Login efetuado com sucesso!</span>
    </div>
</template>
  
<style>

    p {
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        text-align: left;
        font-size: 14px;
    }

    .div-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 110px;
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
        padding: 5px;
        margin-top: 10px;
        display: block;
        align-self: center;
        background-color: green;
        border-radius: 5px;

    }

    .form {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: silver solid;
        border-radius: 10px;
        width: fit-content;
        margin: auto;
        background-color: #2f3136;
    }

    label {
        align-self: flex-start;
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