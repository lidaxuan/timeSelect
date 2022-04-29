/* jshint esversion: 6 */
/*
 * @Description:
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/router/index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "", // ImplementationComponent
  //   // component: () => import(/* webpackChunkName: "about" */ "../views/showComponents/showResize.vue"), // optimization // testSelect fontClass
  //   component: () => import(/* webpackChunkName: "about" */ "../views/ImplementationComponent/index.vue"), // optimization // testSelect fontClass
  //   // component: () => import(/* webpackChunkName: "about" */ "../views/Luckysheet/index.vue"), // optimization // testSelect fontClass
  //   // component: () => import(/* webpackChunkName: "about" */ "../views/test/dropdownDemo.vue"), // optimization // testSelect fontClass
  // },
  {
    path: "/",
    name: "", // ImplementationComponent
    // component: () => import(/* webpackChunkName: "about" */ "../views/showComponents/showResize.vue"), // optimization // testSelect fontClass
    component: () => import(/* webpackChunkName: "about" */ "@/views/test/timeSelect/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/Luckysheet/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/dropdownDemo.vue"), // optimization // testSelect fontClass
  },
  // {
  //   path: "/",
  //   name: "", // ImplementationComponent
  // },
  {
    path: "/showdigitroll",
    name: "showdigitroll",
    component: () => import(/* webpackChunkName: "about" */ "../views/showComponents/showResize.vue"), // optimization // testSelect fontClass
  },
  // {
  //   path: "/question",
  //   name: "Home",
  //   component: () => import(/* webpackChunkName: "about" */ "../views/question/index.vue"), // optimization // testSelect fontClass
  // },
  // {
  //   path: "/testComp",
  //   name: "testComp",
  //   component: () => import(/* webpackChunkName: "about" */ "../views/testComp.vue"), // optimization // testSelect fontClass
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  // {
  //   path: "/ed",
  //   name: "ed",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/ed.vue"),
  // },
  {
    path: "/optimization",
    component: () => import(/* webpackChunkName: "about" */ "../views/test/optimization"),
  },
  {
    path: "/testSelect",
    component: () => import(/* webpackChunkName: "about" */ "../views/test/testSelect"),
  },
  {
    path: "/deconstruction",
    component: () => import(/* webpackChunkName: "about" */ "../views/test/deconstruction"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
