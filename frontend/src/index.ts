import Vue from "vue";
import ChatBox from "./components/ChatBox.vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

let v = new Vue({
      el: "#app",
      template: `
      <div class="jumbotron text-center">
          <h1>{{mainTitle}}</h1>
          <chat-box />
      </div>
      `,
      data() {
        return {
          mainTitle: 'StudentScore'
        }
      },
      components: {
          ChatBox
      }
  });

