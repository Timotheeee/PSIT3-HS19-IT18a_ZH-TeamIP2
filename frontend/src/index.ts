import Vue from "vue";
import QuestionBox from "./components/QuestionBox.vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

let v = new Vue({
      el: "#app",
      template: `
      <div class="jumbotron text-center">
          <h1>{{mainTitle}}</h1>
          <question-box />
      </div>
      `,
      data() {
        return {
          mainTitle: 'StudentScore'
        }
      },
      components: {
          QuestionBox
      },
      methods: {

      }
  });

