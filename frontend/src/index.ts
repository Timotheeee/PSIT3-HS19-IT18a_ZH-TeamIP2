import Vue from "vue";
import QuestionBoxComponent from "./components/QuestionBox";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <h1>{{mainTitle}}!</h1>
        <QuestionBox :question="How long did you sleep?" />
    </div>`,
    data: {
        mainTitle: "StudentScore"
    },
    components: {
      QuestionBoxComponent
    }
});
