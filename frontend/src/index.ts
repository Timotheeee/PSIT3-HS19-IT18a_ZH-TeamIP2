import Vue from "vue";
import ChatInteraction from "./components/ChatInteraction.vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);

let v = new Vue({
      el: "#app",
      template: `
      <div class="jumbotron text-center">
        <the-header />
        <h1>{{mainTitle}}</h1>
        <chat-interaction />
        <the-footer />
      </div>
      `,
      data() {
        return {
          mainTitle: 'StudentScore'
        }
      },
      components: {
          ChatInteraction
      }
  });

