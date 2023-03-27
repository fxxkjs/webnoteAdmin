import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'userCentont',
      component: () => import("../components/UserContent.vue")
    },
    {
      path: '/userDetail/:userID/:userKey',
      name: 'userDetail',
      component: () => import("../components/UserDetail.vue"),
      beforeEnter:(to, from) => {
        to.fullPath ='/'+ to.fullPath.slice(1).split('/').shift()
      }
    },
    {
      path: '/adminContent',
      name: 'adminContent',
      component: () => import("../components/AdminContent.vue")
    },
    {
      path: '/adminData',
      name: 'adminData',
      component: () => import("../components/AdminData.vue")
    },
    // {
    //   path: '/adminData',
    //   name: 'adminData',
    //   component: () => import("../components/ShowImg.vue")
    // }
  ]
})

export default router
