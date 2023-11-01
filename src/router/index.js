import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'
import Tarefas from '@/views/TarefasView.vue'
import Login from '@/views/LoginView.vue'
import CadTarefa from '@/views/CadastroTarefaView.vue'
import CadUsuario from '@/views/CadastrarUsuarioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/cad-tarefas',
      name: 'cad_tarefas',
      component: CadTarefa
    },
    {
      path: '/cad-usuario',
      name: 'cad_usuario',
      component: CadUsuario
    }
  ]
})

export default router
