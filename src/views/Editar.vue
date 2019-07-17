<template>
    <div>
        <h1 class="mb-3">Editar</h1>
        <div v-if="carga" class="text-center mt-5">
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>
        <div v-if="!carga">
            <form class="form-inline" @submit.prevent="editarTarea(tarea)">
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Nombre</span>
                    </div>
                    <input type="text" class="form-control" v-model="$v.tarea.nombre.$model">
                </div>
                <button type="submit" class="btn btn-primary mb-2" :disabled="$v.$invalid">Editar</button>
            </form>
            <div v-if="$v.tarea.nombre.$dirty">
                <small class="text-danger d-block" v-if="!$v.tarea.nombre.required">Campo requerido</small>
                <small class="text-danger d-block" v-if="!$v.tarea.nombre.minLength">Debe tener al menos 5 caracteres</small>
            </div>
            <!-- {{id}} - {{tarea}} -->
            <!-- {{$v.tarea.nombre}} -->
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required, minLength, between } from 'vuelidate/lib/validators';
export default {
    name: 'Editar',
    data() {
        return {
            id: this.$route.params.id
        }
    },
    methods: {
        ...mapActions(['getTarea', 'editarTarea'])
    },
    created(){
        this.getTarea(this.id)
    },
    computed: {
        ...mapState(['tarea', 'carga'])
    },
    validations: {
        tarea: {
            nombre: {
                required,
                minLength: minLength(5)
            }
        }
    }
}
</script>
