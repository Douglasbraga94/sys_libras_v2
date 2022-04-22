<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Minhas Informações" active>
                        
                        <b-form >
                            <input id="user-id" type="hidden" v-model="user.id" />
                            <b-row>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Nome:" label-for="user-name">
                                        <b-form-input id="user-name" type="text"
                                            v-model="user.nome" required
                                            :readonly="!isEdit"
                                            placeholder="Informe o Nome do Usuário..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6" sm="12">
                                    <b-form-group label="E-mail:" label-for="user-email">
                                        <b-form-input id="user-email" type="text"
                                            v-model="user.email" required
                                            :readonly="!isEdit"
                                            placeholder="Informe o E-mail do Usuário..." />
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-row >
                                <b-col md="6" sm="12">
                                    <b-form-group label="Senha:" label-for="user-password">
                                        <b-form-input id="user-password" type="password"
                                            v-model="user.senha" :readonly="!isEdit" required
                                            placeholder="Informe a Senha do Usuário..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Ministério:" 
                                        label-for="ministerio">
                                        <b-form-input id="ministerio" type="text"
                                            v-model="user.ministerio" :readonly="!isEdit" required
                                            placeholder="Ministério do Usuário..." />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col xs="12">
                                    <b-button variant="success" v-if="isEdit"
                                        @click="save">Salvar</b-button>
                                    <b-button variant="primary" 
                                        @click="isEdit=true" v-if="!isEdit">Editar</b-button>
                                    <b-button class="ml-2" @click="isEdit=false" v-if="isEdit"> Cancelar</b-button>
                                </b-col>
                            </b-row>
                        </b-form>

                    </b-tab>
                    <b-tab title="Usuários do sistema" v-if="isAdmin">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../tamplate/PageTitle.vue'
import { baseApiUrl, showError } from '@/global'
import UserAdmin from './UserAdmin'
import { mapState } from 'vuex'
import axios from 'axios'

    
export default {
    name: 'AdminPages',
    components: { PageTitle, UserAdmin },
    computed:mapState(['isAdmin', 'user']),
    data: function() {
        return {
            isEdit: false,
            mode: 'edit'
        }
    },
    methods:{
        reset() {
            this.isEdit = false
            this.mode = 'save'
        },
        save() {
            let user = this.user
            delete user.exp
            delete user.iat
            delete user.token
            console.log(user)
            const method = user.id ? 'put' : 'post'
            const id = user.id ? `/${user.id}` : ''
            console.log(method)
            console.log(id)
            axios[method](`${baseApiUrl}/usuario${id}`, user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/usuario/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },

    },

}
</script>

<style>

</style>
