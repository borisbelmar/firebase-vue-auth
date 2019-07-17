<template>
    <div>
        <h1>Ingreso de usuarios</h1>
        <form @submit.prevent="ingresoUsuario({email, pass})">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" placeholder="Enter email" v-model="email">
                <small class="form-text text-danger">{{error}}</small>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="pass">
            </div>
            <button type="submit" class="btn btn-primary">Acceder</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
    }
}
</script>

