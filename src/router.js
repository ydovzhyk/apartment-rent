import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from "vue-router";
import store from "./store";

const HomePage = () => import("./pages/HomePage.vue");
const ApartmentPage = () => import("./pages/ApartmentPage.vue");
const LoginPage = () => import("./pages/Login.Page.vue");
const RegistrationPage = () => import("./pages/RegistrationPage.vue");
const NotFoundPage = () => import("./pages/NotFoundPage.vue");
const MyOrdersPage = () => import("./pages/MyOrdersPage.vue");
const MyProfilePage = () => import("./pages/MyProfilePage.vue");
const RegisterApartmentPage = () => import("./pages/RegisterApartmentPage.vue");

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "homepage",
  },
  {
    path: "/apartments/:_id",
    component: ApartmentPage,
    name: "apartment",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login-page",
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/registration",
    component: RegistrationPage,
    name: "registration-page",
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/my-orders",
    component: MyOrdersPage,
    name: "my-orders",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/my-profile",
    component: MyProfilePage,
    name: "my-profile",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register-apartment",
    component: RegisterApartmentPage,
    name: "register-apartment",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
    name: "notfoundpage",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = store.state.auth.isLoggedIn;

  const authData = await JSON.parse(
    localStorage.getItem("apartment-rent-auth")
  );

  if (authData && authData.accessToken) {
    isLoggedIn = true;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      return next({ name: "login-page" });
    }
  }

  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (isLoggedIn) {
      return next({ name: "homepage" });
    }
  }

  next();
});

export default router;
