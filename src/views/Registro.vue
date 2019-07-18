<template>
    <div>
        <h1>Registro de usuarios</h1>
        <form @submit.prevent="crearUsuario({email:email, pass:pass1})">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" placeholder="Enter email" v-model="$v.email.$model">
                <div v-if="$v.email.$dirty">
                    <small class="form-text text-danger" v-if="!$v.email.required">El campo es requerido</small>
                    <small class="form-text text-danger" v-if="!$v.email.email">Debes ingresar un email válido</small>
                </div>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="$v.pass1.$model">
                <div v-if="$v.pass1.$dirty">
                    <small class="form-text text-danger" v-if="!$v.pass1.required">El campo es requerido</small>
                    <small class="form-text text-danger" v-if="!$v.pass1.minLength">La contraseña debe tener al menos 6 caracteres</small>
                </div>
            </div>
            <div class="form-group">
                <label>Confirmar password</label>
                <input type="password" class="form-control" placeholder="Reingresa Password" v-model="$v.pass2.$model">
                <div v-if="$v.pass2.$dirty">
                    <small class="form-text text-danger" v-if="!$v.pass2.sameAsPassword">La contraseñas deben coincidir</small>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Registrarse</button>
        </form>
        <small class="text-danger d-block mt-3" v-if="error === 'auth/email-already-in-use'">Email ya registrado, intenta <router-link :to="{name:'ingreso'}">ingresar</router-link></small>
    </div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import { required, minLength, sameAs, email  } from 'vuelidate/lib/validators';
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
        ...mapState(['error'])
    },
    validations: {
        email: {required, email},
        pass1: {required, minLength: minLength(6)},
        pass2: {sameAsPassword: sameAs('pass1')}
    }
}
</script>

