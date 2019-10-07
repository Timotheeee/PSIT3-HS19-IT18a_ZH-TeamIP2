import Vue from "vue";
import QuestionBox from "./components/QuestionBox.vue";
import AnswerBox from "./components/AnswerBox.vue";


let v = new Vue({
      el: "#app",
      template: `
      <div>
          <h1>{{mainTitle}}</h1>
          <QuestionBox @inputData="updateAnswer" />
          <AnswerBox :answr="childData" />
      </div>
      `,
      data() {
        return {
          mainTitle: 'StudentScore',
          childData: ""
        };
      },
      components: {
          QuestionBox,
          AnswerBox
      },
      methods: {
        updateAnswer(variable: string){
          this.childData =variable;
        }

      }
  });



