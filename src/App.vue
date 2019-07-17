<template>
  <div id="app" class="container">
    <div id="nav">
      <ul class="nav">
        <li class="nav-item" v-if="existeUsuario">
          <router-link class="nav-link active" :to="{name:'inicio'}">Home</router-link>
        </li>
        <li class="nav-item" v-if="!existeUsuario">
          <router-link class="btn btn-primary mr-2" :to="{name:'registro'}">Registro</router-link>
        </li>
        <li class="nav-item" v-if="!existeUsuario">
          <router-link class="btn btn-info" :to="{name:'ingreso'}">Ingreso</router-link>
        </li>
        <li class="nav-item" v-if="existeUsuario">
          <button class="btn btn-danger" @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesión</button>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: 'App',
  methods: {
    ...mapActions(['cerrarSesion'])
  },
  computed: {
    ...mapGetters(['existeUsuario'])
  }
}
</script>


<style>

</style>
