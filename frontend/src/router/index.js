import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/authentications/Login.vue';
import Top from '../views/contents/Top.vue';
import SignUp from '../views/authentications/SignUp.vue';

const routes = [
  { path: '/', name: "login", component: Login },
  { path: '/top', name: "top", component: Top },
  { path: '/signUp', name: "signUp",component: SignUp }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
