import Vue from "vue";
import ChatInteraction from "./components/ChatInteraction.vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);

let v = new Vue({
      el: "#app",
      template: `
      <chat-interaction />
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

