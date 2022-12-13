import Vue from 'vue'
import VueRouter from 'vue-router'
import UploadingFiles from '../components/UploadingFiles'
import Results from '../components/Results'
import Comp from '../components/Comp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UploadingFiles',
    component: UploadingFiles
  },
  {
    path: '/Comp',
    name: 'Comp',
    component: Comp
  },




  {
    path: '/Results',
    name: 'Results',
    component: Results
  }
]

const router = new VueRouter({
  routes
})

export default router
