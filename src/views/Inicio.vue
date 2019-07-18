<template>
    <div>
        <h1>Lista de tareas</h1>
        <h6>{{usuario.email}}</h6>
        <router-link :to="{name: 'agregar'}" class="btn btn-success btn-block">
            Agregar
        </router-link>
        <div v-if="carga" class="text-center mt-5">
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>
        <div class="mt-3">
            <form @submit.prevent="buscador(texto)">
                <input type="text" placeholder="Buscar..." class="form-control" v-model="texto" @keyup="buscador(texto)">
            </form>
        </div>
        <ul class="list-group mt-4" v-if="!carga">
            <li class="list-group-item" v-for="tarea of arrayFiltrado" :key="tarea.id">
                <strong>{{tarea.nombre}}</strong> <span class="badge badge-pill badge-light"> id: {{tarea.id}}</span>
                <div class="float-right">
                    <router-link :to="{name: 'editar', params: {id: tarea.id}}">
                    <button class="btn btn-info mr-2">Editar</button>
                </router-link>
                <button class="btn btn-danger" @click="eliminarTarea(tarea.id)">Eliminar</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
    name: 'Inicio',
    computed: {
        ...mapState(['usuario', 'tareas', 'carga']),
        ...mapGetters(['arrayFiltrado'])
    },
    methods: {
        ...mapActions(['getTareas', 'eliminarTarea', 'buscador'])
    },
    created(){
        this.getTareas();
    },
    data() {
        return {
            texto: ''
        }
    }
}
</script>
