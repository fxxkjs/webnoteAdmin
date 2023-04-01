import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LogIn",
      component: () => import("@/views/LogIn/LogIn.vue"),
    },
    {
      path: "/Home",
      name: "Home",
      component: () => import("@/views/Home/Home.vue"),
      children: [
        {
          path: "/Home",
          name: "userCentont",
          component: () => import("@/views/Home/components/UserContent.vue"),
        },
        {
          path: "/Home/userDetail",
          name: "userDetail",
          component: () => import("@/views/Home/components/UserDetail.vue"),
          // beforeEnter: (to, from) => {
          //   to.fullPath = to.fullPath.split("?")[0]
          // },
        },
        {
          path: "/Home/AdminContent",
          name: "AdminContent",
          component: () => import("@/views/Home/components/AdminContent.vue"),
        },
        {
          path: "/Home/adminContent",
          name: "adminContent",
          component: () => import("@/views/Home/components/AdminContent.vue"),
        },
        {
          path: "/Home/adminData",
          name: "adminData",
          component: () => import("@/views/Home/components/adminData.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  to.fullPath = "";
});

export default router;
