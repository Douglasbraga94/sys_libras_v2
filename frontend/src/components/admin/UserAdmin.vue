<template>
    <div class="user-admin" >
        <b-form v-if="isEdit">
            <input id="user-codigo" type="hidden" v-model="user.codigo" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.nome" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="user.senha" required
                            placeholder="Informe a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Ministério:" 
                        label-for="ministerio">
                        <b-form-input id="ministerio" type="text"
                            v-model="user.ministerio" required
                            placeholder="Ministério do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Perfil:" label-for="user-profile">
                        <b-form-select id="user-profile" v-model="user.codigoPerfil" :readonly="!isEdit" :options="profilesOptions"></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12"></b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <div v-show="!isEdit">
            <div class="card-header">
                <h3>Congregação Cristã no Brasil - Cadastro de Usuários
                <button type="button" @click="isEdit = true" class="btn btn-outline-info btn-lg">
                    <i class="fa fa-plus-circle"></i>
                </button>
                </h3>
            </div>
            <b-table hover striped :items="users" :fields="fields">

                <template #cell(actions)="data">
                    <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data: function() {
        return {
            mode: 'save',
            user: {},
            users: [],
            isEdit: false,
            fields: [
                { key: 'codigo', label: 'Código', sortable: true },
                { key: 'nome', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'perfil', label: 'Perfil', sortable: true },
                { key: 'actions', label: 'Ações' }
            ],
            profiles: [],
            profilesOptions: []
        }
    },
    methods: {
        async loadUsers() {
            const url = `${baseApiUrl}/usuario`
            await axios.get(url).then(res => {
                this.users = res.data
            })
        },
        async reset() {
            this.isEdit = false
            this.mode = 'save'
            this.user = {}
            await this.loadUsers()
        },
        save() {
            const method = this.user.codigo ? 'put' : 'post'
            const id = this.user.codigo ? `/${this.user.codigo}` : ''
            axios[method](`${baseApiUrl}/usuario${id}`, this.user)
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
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
            this.isEdit = true
        },
        async loadProfiles() {
            await axios.get(`${baseApiUrl}/perfil`)
                .then((res) => {
                    this.profiles = res.data;
                })
            this.setProfilesOptions()
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
    created() {
        this.loadUsers()
        this.loadProfiles()
    }
}
</script>

<style>

</style>
