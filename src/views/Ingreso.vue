<template>
    <div>
        <h1>Ingreso de usuarios</h1>
        <form @submit.prevent="ingresoUsuario({email, pass})">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" placeholder="Email" v-model="$v.email.$model">
                <div v-if="$v.email.$dirty">
                    <small class="form-text text-danger" v-if="!$v.email.required">El campo es requerido</small>
                    <small class="form-text text-danger" v-if="!$v.email.email">No es un email válido</small>
                </div>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="$v.pass.$model">
                <div v-if="$v.pass.$dirty">
                    <small class="form-text text-danger" v-if="!$v.pass.required">El campo es requerido</small>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Acceder</button>
        </form>
        <small class="text-danger d-block mt-3" v-if="error === 'auth/wrong-password'">Contraseña incorrecta</small>
        <small class="text-danger d-block mt-3" v-if="error === 'auth/too-many-requests'">Demasiados intentos, espera unos minutos</small>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';
export default {
    name: 'Ingreso',
    data() {
        return {
            email: '',
            pass: ''
        }
    },
    methods: {
        ...mapActions(['ingresoUsuario'])
    },
    computed: {
        ...mapState(['error'])
    },
    validations: {
        email: {required, email},
        pass: {required}
    }
}
</script>

