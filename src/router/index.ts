import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/',redirect:"/newtab"},
    {
      path: '/newtab',
      name: 'Newtab',
      component: ()=>import('@/views/newtab/App.vue')
    },
    {
      path: '/popup',
      name: 'Popup',
      component: ()=>import('@/views/popup/App.vue')
    },
    {
      path: '/background',
      name: 'Background',
      component: ()=>import('@/views/background/App.vue')
    },
    
  ]
})

export default router
