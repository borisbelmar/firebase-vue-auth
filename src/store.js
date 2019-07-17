import Vue from 'vue';
import Vuex from 'vuex';
var firebase = require("firebase/app");
import Router from 'vue-router';
import router from './router';
import db from './main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: '',
    error: '',
    tareas: [],
    tarea: {nombre: '', id: ''}
  },
  mutations: {
    // Mutaciones de usuario
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    // Mutaciones de tareas
    setTareas(state, tareas) {
      state.tareas = tareas;
    },
    setTarea(state, tarea) {
      state.tarea = tarea;
    },
    eliminarTarea(state, id) {
      state.tareas = state.tareas.filter( doc => {
        return doc.id != id;
      });
    }
  },
  actions: {
    //Acciones de usuario
    crearUsuario({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
      .then(res => {
        commit('setUsuario', {email: res.user.email}, {uid: res.user.uid});
        //Crear una tarea
        db.collection(res.user.email).add({
          nombre: 'Tarea de ejemplo'
        })
        .then(() => {
          router.push({name:'inicio'});
        });
      })
      .catch(err => {
        commit('setError', err.message);
      });
    },
    ingresoUsuario({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
      .then(res => {
        console.log(res);
        commit('setUsuario', {email: res.user.email}, {uid: res.user.uid});
        router.push({name:'inicio'});
      })
      .catch(err => {
        console.log(err);
        commit('setError', err.message);
      });
    },
    detectarUsuario({commit}, payload) {
      if(payload != null) {
        commit('setUsuario', {email: payload.email, uid: payload.uid});
      } else {
        commit('setUsuario', null);
      }
    },
    cerrarSesion({commit}) {
      firebase.auth().signOut();
      commit('setUsuario', null);
      router.push({name:'ingreso'});
    },
    //Acciones de tareas 
    getTareas({commit}) {
      const usuario = firebase.auth().currentUser;
      const tareas = [];
      db.collection(usuario.email).get()
      .then(snapshot => {
        snapshot.forEach( doc => {
          let tarea = doc.data();
          tarea.id = doc.id;
          tareas.push(tarea);
        } );
      });
      commit('setTareas', tareas);
    },
    getTarea({commit}, id) {
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(id).get()
      .then(doc => {
        let tarea = doc.data();
        tarea.id = doc.id;
        commit('setTarea', tarea);
      });
    },
    editarTarea({commit}, tarea) {
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre
      })
      .then(() => {
        router.push({name: 'inicio'});
      });
    },
    agregarTarea({commit}, nombre) {
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).add({
        nombre: nombre
      })
      .then(doc => {
        console.log(doc.id);
        router.push({name:'inicio'});
      });
    },
    eliminarTarea({commit, dispatch}, id) {
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(id).delete()
      .then(() => {
        console.log(`Tarea ${id} eliminada`);
        //dispatch('getTareas');
        commit('eliminarTarea', id);
      });
    }
  },
  getters: {
    existeUsuario(state) {
      if(state.usuario === null || state.usuario === '' || state.usuario === undefined) {
        return false;
      } else {
        return true;
      }
    }
  }
});
