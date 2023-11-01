import { defineStore } from "pinia";
import axios from 'axios';
import { userStore } from '/src/stores/UserStore.js'
    
export const gerirTarefaStore = defineStore('gerirTarefaStore', {
    state() {
        return {
            urlPadrao: 'http://127.0.0.1:8000/api/'
        }
    },
    actions: {
        vincularTarefa(tarefaId){
            let url = this.urlPadrao + 'associar-tarefa/' + tarefaId;
            const store = userStore();
            
            let configuracao = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + store.showToken
                },
            }

            axios.put(url, configuracao)
                .then(response => {
                    console.log('sucessso');
                })
                .catch(errors => {
                    console.log(errors);
                })
        },
        concluirTarefa(tarefaId){
            let url = this.urlPadrao + 'concluir-tarefa/' + tarefaId;
            const store = userStore();
            
            let configuracao = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + store.showToken
                },
            }

            axios.get(url, configuracao)
                .then(response => {
                    console.log('sucessso');
                })
                .catch(errors => {
                    console.log(errors);
                })
        }
    },
    getters: {

    }
});