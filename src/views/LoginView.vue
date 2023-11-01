<template>
    <div class="about">
        <h1>Form de login</h1>
        <input type="text" name="apelido" v-model="apelido">
        <input type="password" name="password" v-model="password">

        <button type="button" @click.prevent="submit()">enviar</button>

        <div style="background-color: green; border: 1px solid red" v-if="logado">texto</div>
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