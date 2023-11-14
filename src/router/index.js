import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Ranking from '@/views/Ranking.vue'
import About from '@/views/AboutView.vue'
import Tarefas from '@/views/TarefasView.vue'
import Login from '@/views/LoginView.vue'
import CadUsuario from '@/views/CadastrarUsuarioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tarefas',
      name: 'tarefas',
      component: Tarefas
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/cad-usuario',
      name: 'cad_usuario',
      component: CadUsuario
    }
  ]
})

export default router
