import Vue from "vue";
import Results from "./components/Results.vue";
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);

let v = new Vue({
      el: "#results",
      template: `
      <div class="container" style="background-color: white; border:1px solid black">
        <div class="jumbotron text-center" style="background-color: white;">
          <results />
        </div>
      </div>
      `,
      data() {
        return {
          
        }
      },
      components: {
          Results,
          TheFooter,
          TheHeader
      }
  });

