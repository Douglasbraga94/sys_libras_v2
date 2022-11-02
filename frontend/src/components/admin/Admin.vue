<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Minhas Informações" active>
                        <b-form >
                            <input id="user-codigo" type="hidden" v-model="user.codigo" />
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
                                <b-col md="6" sm="12">
                                    <b-form-group label="Perfil:" label-for="user-profile">
                                        <b-form-select id="user-profile" v-model="user.codigoPerfil" :readonly="!isEdit" :options="profilesOptions"></b-form-select>
                                    </b-form-group>
                                </b-col>
                                <b-col md="6" sm="12"></b-col>
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
            mode: 'edit',
            profiles: [],
            profilesOptions: []
        }
    },
    methods:{
        reset() {
            this.isEdit = false
            this.mode = 'save'
        },
        save() {
            const method = this.user.codigo ? 'put' : 'post'
            const codigo = this.user.codigo ? `/${this.user.codigo}` : ''
            axios[method](`${baseApiUrl}/usuario${codigo}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const codigo = this.user.codigo
            axios.delete(`${baseApiUrl}/usuario/${codigo}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        async loadProfiles() {
            await axios.get(`${baseApiUrl}/perfil`)
                .then((res) => {
                    this.profiles = res.data;
                })
        }, 
        setProfilesOptions() {
            this.profiles.forEach(profile => {
                const option = {
                    value: profile.codigo, 
                    text: profile.nome, 
                    disabled: !profile.ativo
                }
                this.profilesOptions.push(option);
            })
        }

    },
    watch: {
        'user.codigoPerfil'(newValue) {
            if(newValue)
                this.user.perfil = this.profiles.find(profile => profile.codigo === newValue ).nome
        }
    },
    async mounted() {
        await this.loadProfiles()
        this.setProfilesOptions()
    }

}
</script>

<style>

</style>
