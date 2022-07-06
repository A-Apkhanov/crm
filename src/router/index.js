import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty', auth: false, protect: true },
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty', auth: false, protect: true },
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: true, protect: true },
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true, protect: true },
    component: () => import('../views/CategoriesView.vue'),
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: { layout: 'main', auth: true, protect: true },
    component: () => import('../views/DetailRecordView.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true, protect: true },
    component: () => import('../views/HistoryView.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: true, protect: true },
    component: () => import('../views/PlanningView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true, protect: true },
    component: () => import('../views/ProfileView.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true, protect: true },
    component: () => import('../views/RecordView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const protect = to.matched.some((record) => record.meta.protect);
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (protect) {
    if (requireAuth) {
      next(user ? null : '/login?message=login');
    } else {
      next(user ? '/' : null);
    }
  } else {
    next();
  }
});

export default router;
