<template>
    <div>
        <h1>Agregar</h1>
        <form class="form-inline" @submit.prevent="agregarTarea(nombre)">
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Nombre</span>
                </div>
                <input type="text" class="form-control" v-model="nombre">
            </div>
            <button type="submit" class="btn btn-primary mb-2">Agregar</button>
        </form>
        {{nombre}}
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'Agregar',
    data(){
        return {
            nombre: ''
        }
    },
    methods: {
        ...mapActions(['agregarTarea'])
    }
}
</script>

