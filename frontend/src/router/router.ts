import Vue from 'vue'
import Router from 'vue-router'
import TheWelcomeSite from './../components/TheWelcomeSite.vue'
import TheResultSite from './../components/TheResultSite.vue'
import ChatInteraction from './../components/ChatInteraction.vue'
import TheAdminPage from './../components/TheAdminPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'Frontpage',
      component: TheWelcomeSite,
    },
    {
      path: '/questionnaire',
      name: 'Questionnaire',
      component: ChatInteraction
    },
    {
      path: '/results/:score',
      name: 'Results',
      component: TheResultSite
    },
    {
      path: '/adminpage',
      name: 'AdminPage',
      component: TheAdminPage
    },
    {
      path: '/api',
      name: 'api'
    },
    {
      path: '/score',
      name: 'score'
    }
  ]
})
