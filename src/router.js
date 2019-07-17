import Vue from 'vue';
import Router from 'vue-router';
const firebase = require('firebase/app');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/registro',
      name: 'registro',
      component: () => import(/* webpackChunkName: "registro" */ './views/Registro.vue')
    },
    {
      path: '/ingreso',
      name: 'ingreso',
      component: () => import(/* webpackChunkName: "ingreso" */ './views/Ingreso.vue')
    },
    {
      path: '/',
      name: 'inicio',
      component: () => import(/* webpackChunkName: "inicio" */ './views/Inicio.vue'),
      meta: { requiredAuth: true }
    },
    {
      path: '/editar/:id',
      name: 'editar',
      component: () => import(/* webpackChunkName: "editar" */ './views/Editar.vue'),
      meta: { requiredAuth: true }
    },
    {
      path: '/agregar',
      name: 'agregar',
      component: () => import(/* webpackChunkName: "agregar" */ './views/Agregar.vue'),
      meta: { requiredAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requiredAuth);
  const user = firebase.auth().currentUser;
  if(rutaProtegida && user === null) {
    next({name:'ingreso'});
  } else {
    next();
  }
});

export default router;