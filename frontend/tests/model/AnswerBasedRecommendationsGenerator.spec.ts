import { AnswerBasedRecommendationsGenerator, AnswerBasedRecommendationConfigJSON } from '../../src/model/Graph/Recommendation/AnswerBasedRecommendationsGenerator';
import { GraphIterator } from '../../src/model/Graph/GraphIterator';
import { GraphFactory } from '../../src/model/Graph/GraphFactory';
import { Graph } from '../../src/model/Graph/Graph';

describe('AnswerBasedRecommendationsGenerator', () => {
  const TEST_JSON_STRING_TEMP: string = "{\"nodes\":[{\"id\":\"q1\",\"metadata\":{\"isHead\":true,\"answerType\":\"input\",\"title\":\"Hey thanks for using StudentScore! Do you wanna tell me your name? If not I'll just call you Bob\"}},{\"id\":\"q2\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"%username% are you a gamer?\"}},{\"id\":\"q3\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"Ah I see you are a person of culture as well %username%. How much time do you spend gaming in a week?\"}},{\"id\":\"q4\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"%username% are you more of a athletic person?\"}},{\"id\":\"q5\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"How much do you exercise in a week? \"}},{\"id\":\"q6\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"Wow! So I would say you are an exemplary student! Keep up the good work %username%!\"}},{\"id\":\"q7\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"Pretty impressive %username%!... Do you even have time for school?\"}},{\"id\":\"q8\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"So no gaming, no exercising... hmmm what is left... are you more the 'party hard' type?\"}},{\"id\":\"q9\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"Tell me %username%...are you happy with your grades?\"}},{\"id\":\"q10\",\"metadata\":{\"answerType\":\"result\",\"title\":\"Great! You are finished! Would you like to see the results?\"}},{\"id\":\"fn1\",\"metadata\":{\"title\":\"...\",\"answerType\":\"result\",\"isFinalNode\":true}}],\"edges\":[{\"source\":\"q1\",\"target\":\"q2\",\"edgeId\":\"e1\",\"metadata\":{\"answer\":\"Bob\",\"score\":0}},{\"source\":\"q2\",\"target\":\"q3\",\"edgeId\":\"e2\",\"metadata\":{\"answer\":\"Yes\",\"score\":-10}},{\"source\":\"q2\",\"target\":\"q4\",\"edgeId\":\"e3\",\"metadata\":{\"answer\":\"No\",\"score\":10}},{\"source\":\"q3\",\"target\":\"q4\",\"edgeId\":\"e4\",\"metadata\":{\"answer\":\"Between 0 to 2 hours\",\"score\":10}},{\"source\":\"q3\",\"target\":\"q4\",\"edgeId\":\"e5\",\"metadata\":{\"answer\":\"Around 2 to 4 hours\",\"score\":-10}},{\"source\":\"q3\",\"target\":\"q7\",\"edgeId\":\"e6\",\"metadata\":{\"answer\":\"I gave up counting the hours...\",\"score\":-30}},{\"source\":\"q4\",\"target\":\"q5\",\"edgeId\":\"e7\",\"metadata\":{\"answer\":\"Yes, I am!\",\"score\":10}},{\"source\":\"q4\",\"target\":\"q6\",\"edgeId\":\"e8\",\"metadata\":{\"answer\":\"No, I prefer minimum amount of movement...\",\"score\":-10}},{\"source\":\"q5\",\"target\":\"q7\",\"edgeId\":\"e9\",\"metadata\":{\"answer\":\"Everyday!\",\"score\":-10}},{\"source\":\"q5\",\"target\":\"q6\",\"edgeId\":\"e10\",\"metadata\":{\"answer\":\"Just once a week...\",\"score\":10}},{\"source\":\"q5\",\"target\":\"q6\",\"edgeId\":\"e11\",\"metadata\":{\"answer\":\"2 or 3 times a week\",\"score\":30}},{\"source\":\"q7\",\"target\":\"q9\",\"edgeId\":\"e12\",\"metadata\":{\"answer\":\"Yes, no worries about that!\",\"score\":30}},{\"source\":\"q7\",\"target\":\"q9\",\"edgeId\":\"e13\",\"metadata\":{\"answer\":\"What school?\",\"score\":-30}},{\"source\":\"q6\",\"target\":\"q9\",\"edgeId\":\"e14\",\"metadata\":{\"answer\":\"Thank you, I appreciate that!\",\"score\":10}},{\"source\":\"q6\",\"target\":\"q8\",\"edgeId\":\"e15\",\"metadata\":{\"answer\":\"Nah... school isn't really my thing!\",\"score\":-30}},{\"source\":\"q9\",\"target\":\"q10\",\"edgeId\":\"e16\",\"metadata\":{\"answer\":\"I wish... I need to study more...*sigh*\",\"score\":-10}},{\"source\":\"q9\",\"target\":\"q10\",\"edgeId\":\"e17\",\"metadata\":{\"answer\":\"Yeah, I couldn't be better! I am the next Einstein!\",\"score\":10}},{\"source\":\"q8\",\"target\":\"q10\",\"edgeId\":\"e18\",\"metadata\":{\"answer\":\"Oh yeah! Let's all get wasted!\",\"score\":-30}},{\"source\":\"q8\",\"target\":\"q10\",\"edgeId\":\"e19\",\"metadata\":{\"answer\":\"No, let's just say I live by the words: You don't have to worry about life, if you don't have one...\",\"score\":-10}},{\"source\":\"q10\",\"target\":\"fn1\",\"edgeId\":\"e20\",\"metadata\":{\"answer\":\"Sure! Let's see it!\",\"score\":0}}],\"recommendations\":[{\"type\":\"answerBased\",\"data\":[{\"answerSet\":[\"e2\",\"e13\"],\"recommendation\":\"<p><h5>The Hardcore Gamer</h5>Listen here! I think you have a real problem, so for your sake, just check out this page<a>www.gamequitters.com/video-game-addiction-test-for-gamers/</a></p>\"},{\"answerSet\":[\"e2\",\"e13\"],\"recommendation\":\"<p><h5>The Sports Freak</h5> How about slowing down a bit? Too much is never good, check out this page <a>www.huffingtonpost.com.au/2017/08/06/how-much-exercise-is-too-much_a_23064102/</a> </p>\"},{\"answerSet\":[\"e2, e7, e12, e16\"],\"recommendation\":\"<p><h5>The Allrounder</h5> Wow, your really impressed me!...Finding time for everything, being good at school. How about you give me some advise? Tell me your secrets!<a>www.jerryjenkins.com/how-to-write-a-book/</a></p>\"},{\"answerSet\":[\"e14, e16\"],\"recommendation\":\"<p><h5>The Next Einstein</h5> I think you are ready for this...<a>www.admission.princeton.edu/how-apply</a></p>\"},{\"answerSet\":[\"e2\",\"e5\",\"e7\"],\"recommendation\":\"<p><h5>The No Lifer </h5> Don't give up on yourself! Have a look at this page: <a>https://www.betterhelp.com/advice/general/why-do-i-have-no-life/</a></p>\"}]},{\"type\":\"scoreBased\",\"data\":{\"numberOfScorePartitions\":5,\"recommendations\":[\"<p>The Hardcore Gamer</p>\",\"<p>The Sports Freak</p>\",\"<p>The Allrounder</p>\",\"<p>The Next Einstein</p>\",\"<p>The No Lifer</p>\"]}}]}";

  let graph: Graph = GraphFactory.createGraphFromJSON(TEST_JSON_STRING_TEMP);

  describe('constructor()', () => {
    test('should create an AnswerBasedRecommendationsGenerator object', () => {
      let graphIterator = new GraphIterator(graph);
      let config = graph.answerBasedRecommendationConfig!;
      let answerBasedRecGen: AnswerBasedRecommendationsGenerator = new AnswerBasedRecommendationsGenerator(config, graphIterator.getPath(), graph);
      expect(answerBasedRecGen).toBeInstanceOf(AnswerBasedRecommendationsGenerator);
    });
  });

  describe('generate()', () => {
    test('should return a certain recommendation when a certain path is taken', () => {
      let graphIterator = new GraphIterator(graph);
      let config = graph.answerBasedRecommendationConfig!;
      graphIterator.choose("e1");
      graphIterator.choose("e2");
      graphIterator.choose("e6");
      graphIterator.choose("e13");
      graphIterator.choose("e16");
      let answerBasedRecGen: AnswerBasedRecommendationsGenerator = new AnswerBasedRecommendationsGenerator(config, graphIterator.getPath(), graph);
      let recommendations = answerBasedRecGen.generate();
      expect(recommendations.length).toBe(2);
      expect(recommendations[0].includes("The Hardcore Gamer")).toBeTruthy();
      expect(recommendations[1].includes("The Sports Freak")).toBeTruthy();
    })

    test('should return a certain recommendation when a certain path is taken', () => {
      let graphIterator = new GraphIterator(graph);
      let config = graph.answerBasedRecommendationConfig!;
      graphIterator.choose("e1");
      graphIterator.choose("e3");
      graphIterator.choose("e7");
      graphIterator.choose("e11");
      graphIterator.choose("e14");
      graphIterator.choose("e17");
      let answerBasedRecGen: AnswerBasedRecommendationsGenerator = new AnswerBasedRecommendationsGenerator(config, graphIterator.getPath(), graph);
      let recommendations = answerBasedRecGen.generate();
      expect(recommendations.length).toBe(0);
    })
  });

});
