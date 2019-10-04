import Vue from "vue";
import QuestionBox from "./components/QuestionBox.vue";

let v = new Vue({
      el: "#app",
      template: `
      <div>
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

