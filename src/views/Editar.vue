<template>
    <div>
        <h1>Editar</h1>
        <form class="form-inline" @submit.prevent="editarTarea(tarea)">
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Nombre</span>
                </div>
                <input type="text" class="form-control" v-model="tarea.nombre">
            </div>
            <button type="submit" class="btn btn-primary mb-2">Editar</button>
        </form>
        {{id}} - {{tarea}}
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
        ...mapState(['tarea'])
    }
}
</script>
