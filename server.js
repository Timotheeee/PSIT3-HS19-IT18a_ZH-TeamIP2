

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express();
app.use(express.static(__dirname + '/public'));


var server = app.listen(process.env.PORT || 8001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://' + host + ':' + port);
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));




const fs = require('fs');







app.get('/graph', (request, response) => {
    const graphJSONString = '{\r\n  \"nodes\": [\r\n    {\r\n      \"id\": \"q1\",\r\n      \"metadata\": {\r\n        \"isHead\": true,\r\n        \"answerType\": \"input\",\r\n        \"title\": \"Hey thanks for using StudentScore! Do you wanna tell me your name? If not I\'ll just call you Bob\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q2\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"%username% do you play video games?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q3\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"I\'m a gamer myself. How often do you get to pown newbies?\"\r\n      }\r\n    },\r\n      {\r\n      \"id\": \"q4\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"Do you exercise %username%?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q5\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"How often?\"\r\n      }\r\n    },\r\n    {\r\n    \"id\": \"q6\",\r\n    \"metadata\": {\r\n      \"answerType\": \"choice\",\r\n      \"title\": \"Wow! So I would say you are an exemplary student! Keep up the good work %username%!\"\r\n    }\r\n    },\r\n      {\r\n      \"id\": \"q7\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"Rather impressive %username%!... Do you even have time to study?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q8\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"Let\'s see. You don\'t like video games nor sports. Do you like to go out then?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q9\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"Tell me %username%...are you content with your grades?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q10\",\r\n      \"metadata\": {\r\n        \"answerType\": \"result\",\r\n        \"title\": \"Thank your for telling me about your habits! Would you like to see the results?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"fn1\",\r\n      \"metadata\": {\r\n        \"title\": \"...\",\r\n        \"answerType\": \"result\",\r\n        \"isFinalNode\": true\r\n      }\r\n    }\r\n  ],\r\n  \"edges\": [\r\n    {\r\n      \"source\": \"q1\",\r\n      \"target\": \"q2\",\r\n      \"edgeId\": \"e1\",\r\n      \"metadata\": {\r\n        \"answer\": \"Bob\",\r\n        \"score\": 0\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q2\",\r\n      \"target\": \"q3\",\r\n      \"edgeId\": \"e2\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q2\",\r\n      \"target\": \"q4\",\r\n      \"edgeId\": \"e3\",\r\n      \"metadata\": {\r\n        \"answer\": \"No\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q4\",\r\n      \"edgeId\": \"e4\",\r\n      \"metadata\": {\r\n        \"answer\": \"Between 0 to 2 hours\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q4\",\r\n      \"edgeId\": \"e5\",\r\n      \"metadata\": {\r\n        \"answer\": \"Around 2 to 4 hours\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q7\",\r\n      \"edgeId\": \"e6\",\r\n      \"metadata\": {\r\n        \"answer\": \"I gave up counting the hours...\",\r\n        \"score\": -30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q4\",\r\n      \"target\": \"q5\",\r\n      \"edgeId\": \"e7\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes, I am!\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q4\",\r\n      \"target\": \"q6\",\r\n      \"edgeId\": \"e8\",\r\n      \"metadata\": {\r\n        \"answer\": \"No, I hate sports!\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q5\",\r\n      \"target\": \"q7\",\r\n      \"edgeId\": \"e9\",\r\n      \"metadata\": {\r\n        \"answer\": \"Everyday!\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q5\",\r\n      \"target\": \"q6\",\r\n      \"edgeId\": \"e10\",\r\n      \"metadata\": {\r\n        \"answer\": \"Just once a week...\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q5\",\r\n      \"target\": \"q6\",\r\n      \"edgeId\": \"e11\",\r\n      \"metadata\": {\r\n        \"answer\": \"2 or 3 times a week\",\r\n        \"score\": 30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q7\",\r\n      \"target\": \"q9\",\r\n      \"edgeId\": \"e12\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes, no worries about that!\",\r\n        \"score\": 30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q7\",\r\n      \"target\": \"q9\",\r\n      \"edgeId\": \"e13\",\r\n      \"metadata\": {\r\n        \"answer\": \"What school?\",\r\n        \"score\": -30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q6\",\r\n      \"target\": \"q9\",\r\n      \"edgeId\": \"e14\",\r\n      \"metadata\": {\r\n        \"answer\": \"Thank you, I appreciate that!\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q6\",\r\n      \"target\": \"q8\",\r\n      \"edgeId\": \"e15\",\r\n      \"metadata\": {\r\n        \"answer\": \"Nah... school isn\'t really my thing!\",\r\n        \"score\": -30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q9\",\r\n      \"target\": \"q10\",\r\n      \"edgeId\": \"e16\",\r\n      \"metadata\": {\r\n        \"answer\": \"I wish... I need to study more...*sigh*\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q9\",\r\n      \"target\": \"q10\",\r\n      \"edgeId\": \"e17\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yeah, I\'m pretty awesome! I am going to win a nobel prize someday!\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q8\",\r\n      \"target\": \"q10\",\r\n      \"edgeId\": \"e18\",\r\n      \"metadata\": {\r\n        \"answer\": \"Oh yeah! Let\'s all get wasted!\",\r\n        \"score\": -30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q8\",\r\n      \"target\": \"q10\",\r\n      \"edgeId\": \"e19\",\r\n      \"metadata\": {\r\n        \"answer\": \"You can\'t go out if you don\'t have any friends\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q10\",\r\n      \"target\": \"fn1\",\r\n      \"edgeId\": \"e20\",\r\n      \"metadata\": {\r\n        \"answer\": \"Sure! Let\'s see it!\",\r\n        \"score\": 0\r\n      }\r\n    }\r\n\t],\r\n\t\"recommendations\": [\r\n    {\r\n      \"type\": \"answerBased\",\r\n      \"data\": [\r\n        {\r\n          \"answerSet\": [\"e2\",\"e13\"],\r\n          \"recommendation\": \"<p><h5>Habit: competitive gaming!<\/h5>Listen here! I think you have a real problem, so for your sake, just check out this page <a href=\\\"https:\/\/gamequitters.com\/video-game-addiction-test-for-gamers\/\\\">gamequitters.com\/video-game-addiction-test-for-gamers\/<\/a><\/p>\"\r\n        },\r\n        {\r\n          \"answerSet\": [\"e9\"],\r\n          \"recommendation\": \"<p><h5>The Sports Freak<\/h5> How about slowing down a bit? Too much is never good, check out this page <a href=\\\"https:\/\/huffingtonpost.com.au\/2017\/08\/06\/how-much-exercise-is-too-much_a_23064102\/\\\">huffingtonpost.com.au\/2017\/08\/06\/how-much-exercise-is-too-much_a_23064102\/<\/a><\/p>\"\r\n        },\r\n        {\r\n          \"answerSet\": [\"e2, e7, e12, e16\"],\r\n          \"recommendation\": \"<p><h5>Well balanced<\/h5> Wow, your really impressed me!...Finding time for everything, being good at school. How about you give me some advise? Tell me your secrets! <a href=\\\"https:\/\/jerryjenkins.com\/how-to-write-a-book\/\\\">jerryjenkins.com\/how-to-write-a-book\/<\/a><\/p>\"\r\n        },\r\n        {\r\n          \"answerSet\": [\"e14, e16\"],\r\n          \"recommendation\": \"<p><h5>The rare Prodigy<\/h5> I think you are ready for this... <a href=\\\"www.admission.princeton.edu\/how-apply\\\">admission.princeton.edu\/how-apply<\/a><\/p>\"\r\n        },\r\n        {\r\n          \"answerSet\": [\"e2\",\"e5\",\"e7\"],\r\n          \"recommendation\": \"<p><h5>The Workaholic <\/h5> Don\'t give up on yourself! Have a look at this page: <a href=\\\"https:\/\/www.betterhelp.com\/advice\/general\/why-do-i-have-no-life\\\">betterhelp.com\/advice\/general\/why-do-i-have-no-life\/<\/a><\/p><\/a>\"\r\n        }\r\n      ]\r\n    },\r\n    {\r\n      \"type\": \"scoreBased\",\r\n      \"data\": {\r\n        \"numberOfScorePartitions\": 3,\r\n        \"recommendations\": [\r\n          \"<h4>Underachiever<\/h4><p>You are on a slippery slope and might want to look at some of your negative habits.<\/p>\",\r\n          \"<h4>Average Student<\/h4><p>You reached an average result which means that there is some room to improve but also that you are doing the basics right.<\/p>\",\r\n          \"<h4>Excellent Student<\/h4><p>Congratulations, you reached an excellent score. Keep doing what you are doing!<\/p>\"\r\n        ]\r\n      }\r\n    }\r\n  ]\r\n}\r\n';
    response.status(200).json({ success: true, data: graphJSONString });
});

