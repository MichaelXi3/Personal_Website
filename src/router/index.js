import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/viewBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import Team from  "../views/Team.vue";

import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  {
    path: "/updates",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Updates",
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-passward",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "ForgotPassword",
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Post",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: "Post Preview",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/view-post/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: "View Post",
      requiresAuth: false,
    },
  },
  {
    path: "/edit-post/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: "EditPost",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/team",
    name: "Team",
    component: Team,
    meta: {
      title: "Team",
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 页面标签栏的个性化显示 - tab_title
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | AppDev`;
  next();
})

// Route Guard
router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  let admin = null;
  if (user) {
    let token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }
  // Check whether this route requires auth: true -> requires auth
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if(user) {
      if(to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({name: "Home"});
      }
      return next();
    }
    return next({name: "Home"});
  }
  return next();
})

export default router;
