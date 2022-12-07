import Vue from 'vue'
import VueRouter from 'vue-router'
import UploadingFiles from '../components/UploadingFiles'
import Results from '../components/Results'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UploadingFiles',
    component: UploadingFiles
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
