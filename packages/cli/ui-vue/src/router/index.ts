import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';
import HelloWorld from '../views/HelloWorld.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  // {
  //   path: '/projects',
  //   name: 'Projects',
  //   // route level code-splitting
  //   // this generates a separate chunk (projects.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue'),
  // },
  // {
  //   path: '/create',
  //   name: 'Create',
  //   component: () => import('../views/Create.vue'),
  // },
  // {
  //   path: '/import',
  //   name: 'Import',
  //   component: () => import('../views/Import.vue'),
  // },
  {
    path: '/git',
    name: 'git',
    component: () => import('../views/Git/index.vue'),
  },
];

const router = createRouter({
  // history:  createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
