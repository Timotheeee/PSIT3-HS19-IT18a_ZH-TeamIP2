import Vue from "vue";
import Welcome from "./components/Welcome.vue";
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);

let v = new Vue({
      el: "#welcome",
      template: `
      <div class="container" style="background-color: white; border:1px solid black">
        <div class="jumbotron text-center" style="background-color: white;">
          <welcome />
        </div>
      </div>
      `,
      data() {
        return {
          
        }
      },
      components: {
          Welcome,
          TheFooter,
          TheHeader
      }
  });

