<template>
    <div>
        <h1>Registro de usuarios</h1>
        <form @submit.prevent="crearUsuario({email:email, pass:pass1})">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" placeholder="Enter email" v-model="email">
                <small class="form-text text-danger">{{error}}</small>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="pass1">
            </div>
            <div class="form-group">
                <label>Confirmar password</label>
                <input type="password" class="form-control" placeholder="Reingresa Password" v-model="pass2">
            </div>
            <button type="submit" class="btn btn-primary" :disabled="!desactivar">Registrarse</button>
        </form>
    </div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
    name: 'Registro',
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    methods: {
        ...mapActions(['crearUsuario'])
    },
    computed: {
        ...mapState(['error']),
        desactivar() {
            return this.pass1 === this.pass2 && this.pass1 != '' && this.email != ''
        }
    }
}
</script>

