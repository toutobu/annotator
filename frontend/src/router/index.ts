import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '../views/Home.vue';
import AnnotationEditor from '../views/AnnotationEditor.vue';
import ExampleIndex from '../views/ExampleIndex.vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { authGuard } = require('../auth/authGuard');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/examples',
    name: 'ExampleIndex',
    component: ExampleIndex,
    beforeEnter: authGuard,
  },
  {
    path: '/examples/:id',
    name: 'AnnotationEditor',
    component: AnnotationEditor,
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
