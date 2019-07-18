<template>
    <div>
        <h1 class="mb-3">Agregar</h1>
        <form class="form-inline" @submit.prevent="agregarTarea($v.nombre.$model)">
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Nombre</span>
                </div>
                <input type="text" class="form-control" v-model="$v.nombre.$model">
            </div>
            <button type="submit" class="btn btn-primary mb-2" :disabled="$v.$invalid || carga">Agregar</button>
        </form>
        <div v-if="$v.nombre.$dirty">
            <small class="text-danger d-block" v-if="!$v.nombre.required">Campo requerido</small>
            <small class="text-danger d-block" v-if="!$v.nombre.minLength">Debe tener al menos 5 caracteres</small>
            <!-- <small>{{$v.nombre}}</small> -->
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
    name: 'Agregar',
    data(){
        return {
            nombre: ''
        }
    },
    methods: {
        ...mapActions(['agregarTarea'])
    },
    validations: {
        nombre: {
            required,
            minLength: minLength(5)
        }
    },
    computed: {
        ...mapState(['carga'])
    }
}
</script>

