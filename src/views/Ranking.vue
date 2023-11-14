<template>
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
        <tr v-for="(user, index) in sortedUsers" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: 'João', points: 50 },
        { id: 2, name: 'Maria', points: 30 },
        { id: 3, name: 'Pedro', points: 70 },
        { id: 4, name: 'Ana', points: 20 },
        { id: 5, name: 'Lucas', points: 60 },
      ],
    };
  },
  computed: {
    sortedUsers() {
      return this.users.sort((a, b) => b.points - a.points);
    },
  },
};
</script>

<style scoped>
.table-dark {
  width: 80%;
  margin: 20px;
  margin-left: 11%;
  margin-top: 40px;
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