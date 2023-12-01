<template>
  <div>
        <h1>Ranking</h1>
  </div>
  <div>
    <table class="table-dark">
      <thead>
        <tr>
          <th>Colocação</th>
          <th>Nome</th>
          <th>Pontuação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id"><!--sortedUsers" :key="user.id">-->
          <td>{{ index + 1 }}</td>
          <!-- <td>{{ user.name }}</td> -->
          <td>{{ user.nome }}</td>
          <!-- <td>{{ user.points }}</td> -->
          <td>{{ user.pontuacao }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios';

    onMounted(async () => {
        setUser();
    });
    
    const users = ref('');

    const setUser = () => {
      let url = 'http://127.0.0.1:8000/api/usuarios';
        
      let configuracao = {
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer 5|9JRIcHQTzP76SK7JlPi1ryHmRDsfmYpuQZxQk2650445f64c'
          },
      }

      axios.get(url, configuracao)
          .then((response) => {
              users.value = sortUsers(response.data.data)
          })
          .catch(errors => {
              console.log(errors);
          })
    }
    const sortUsers = (data) => {
        return data.sort((a, b) => b.pontuacao - a.pontuacao);
    }
</script>

<style scoped>

h1 {
  padding: 20px;
}
.table-dark {
  width: 80%;
  margin: 20px;
  margin-left: 11%;
  margin-top: 30px;
  border-radius: 10px;
  padding: 4px;
  color: #b9bbbe;
  background-color: #2f3136;
}

.table-dark th, .table-dark td {
  padding: 0.75rem;
}

.table-dark thead th {
  color: #fff;
  background-color: #37393f;
  border-radius: 10px;
  align-items: flex-start;
}

.table-dark tbody + tbody {
  border-top: 2px solid #4f545c;
}
</style>