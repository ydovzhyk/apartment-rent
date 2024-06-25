import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

const HomePage = () => import("./pages/HomePage.vue");
const ApartmentPage = () => import("./pages/ApartmentPage.vue");
const LoginPage = () => import("./pages/Login.Page.vue");
const RegistrationPage = () => import("./pages/RegistrationPage.vue");
const NotFoundPage = () => import("./pages/NotFoundPage.vue");
const MyOrdersPage = () => import("./pages/MyOrdersPage.vue");
const RegisterApartmentPage = () => import("./pages/RegisterApartmentPage.vue");

const baseUrl = process.env.NODE_ENV === "production" ? "/apartment-rent" : "/";

const routes = [
  {
    path: baseUrl,
    component: HomePage,
    name: "homepage",
  },
  {
    path: `${baseUrl}/apartments/:_id`,
    component: ApartmentPage,
    name: "apartment",
  },
  {
    path: `${baseUrl}/login`,
    component: LoginPage,
    name: "login-page",
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: `${baseUrl}/registration`,
    component: RegistrationPage,
    name: "registration-page",
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: `${baseUrl}/my-orders`,
    component: MyOrdersPage,
    name: "my-orders",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: `${baseUrl}/register-apartment`,
    component: RegisterApartmentPage,
    name: "register-apartment",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: `${baseUrl}/:pathMatch(.*)*`,
    component: NotFoundPage,
    name: "notfoundpage",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.auth.isLoggedIn;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: "login-page" });
    }
  }

  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (isLoggedIn) {
      next({ name: "homepage" });
    }
  }

  next();
});

export default router;
