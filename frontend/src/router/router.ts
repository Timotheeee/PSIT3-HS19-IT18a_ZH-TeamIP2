import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './../components/Welcome.vue'
import Results from './../components/Results.vue'
import ChatInteraction from './../components/ChatInteraction.vue'
import AdminPage from './../components/AdminPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'Frontpage',
      component: Welcome,
    },
    {
      path: '/questionnaire',
      name: 'Questionnaire',
      component: ChatInteraction
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    },
    {
      path: '/adminpage',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/api',
      name: 'api'
    }
  ]
})
