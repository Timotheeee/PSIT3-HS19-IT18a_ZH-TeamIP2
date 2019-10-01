import Vue from "vue";

export default Vue.extend({
    template: `
        <div>
          <div id="question"></div>
          <input type="radio" name="answer" value="0"><span id="input0">8 hours</span><br>
          <input type="radio" name="answer" value="1"><span id="input1">5 hours</span><br>
          <button onclick="send()">send to server</button><br>
          server response: <span id="response"></span>
        </div>
    `,
    props: ['question'],
    methods: {
      send() {
        var checked = $("input[name='answer']:checked").val();
        $.ajax({url: "/api/", method: "post", data: {answer: checked}}).done(function (data) {
        $("#response").text(data.data);
        }
      }
    }
});
