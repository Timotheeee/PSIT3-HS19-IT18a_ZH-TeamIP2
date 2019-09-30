var db;

$(function () {
    console.log("jquery works");

    //sample code to make an api request
    $.ajax({url: "/api/", method: "get"}).done(function (data) {
        db = data.db;
        var question = db.questions[0];
        console.log(question);
        $("#question").text(question.title);
        
        //$("stuff").html(question.title + "<br>" + question.answers[0].title)
    });



});
function send() {
    var checked = $("input[name='answer']:checked").val();
    $.ajax({url: "/api/", method: "post", data: {answer: checked}}).done(function (data) {
        $("#response").text(data.data);
    });
}