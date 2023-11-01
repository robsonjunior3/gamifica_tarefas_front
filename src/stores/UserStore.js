import { defineStore } from "pinia";
import axios from 'axios';

export const userStore = defineStore('user', {
    state() {
        return {
            token: '',
            user: null, 
            urlPadrao: 'http://127.0.0.1:8000/'
        }
    },
    actions: {
        login(user){
            let url = this.urlPadrao + 'api/login';
            let configuracao = {
                method: 'post',
                body: new URLSearchParams ({
                    'apelido': user.apelido,
                    'password': user.password,
                })
            };
            
            fetch(url, configuracao)
                .then(response => response.json())
                .then(data => {
                    if(data){
                        if(data != 'Usuário invalido'){
                            document.cookie = 'token='+data+';SameSite=Lax';
                            this.setToken(data);
                            this.setUser();
                        }
                        else console.log('usuario invalido', data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        hasToken(){
            if(this.token) return true;
            
            let token = document.cookie.split(';').find(indice => {
                return indice.includes('token=');
            });
            if(token && token != 'token='){
                this.setToken(token.split('=')[1]);
                return true;
            }
            return false;
        },
        setToken(sanctum){
            this.token = sanctum;
        },
        async setUser(){
            if(this.user) return true;

            if(this.hasToken()){
                let url = this.urlPadrao + 'api/user';

                let configuracao = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    },
                }

                await axios.get(url, configuracao)
                    .then(response => {
                        this.user = response.data;
                        return true;
                    })
                    .catch(errors => {
                        console.log(errors);
                        return false;
                    })
            }
        }
    },
    getters: {
        showToken(){
            if(this.hasToken()) return this.token;
        },
        showUrlPadrao(){
            return this.urlPadrao;
        },
        async getUser(){
            if(this.user) return this.user;
            else {
                await this.setUser();
                return this.user;
            }
        }
    }
});