import { ScoreBasedRecommendationsGenerator } from '../../src/model/Graph/Recommendation/ScoreBasedRecommendationsGenerator';
import { GraphIterator, GraphIteratorInterface, createIterator } from '../../src/model/Graph/GraphIterator';
import { GraphFactory } from '../../src/model/Graph/GraphFactory';
import { Graph } from '../../src/model/Graph/Graph';
import { PathResult } from '../../src/model/Graph/PathResult';

describe('ScoreBasedRecommendationsGenerator', () => {
  const JSON_RECOMMENDATION_TEST: string = "{\r\n  \"nodes\": [\r\n    {\r\n      \"id\": \"q1\",\r\n      \"metadata\": {\r\n        \"isHead\": true,\r\n        \"answerType\": \"input\",\r\n        \"title\": \"Hey thanks for using StudentScore! Do you wanna tell me your name? If not I'll just call you Bob\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q2\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"%username% are you a gamer?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q3\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"Ah I see you are a person of culture as well %username%. How much time do you spend gaming in a week?\"\r\n      }\r\n    },\r\n      {\r\n      \"id\": \"q4\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"%username% are you more of a athletic person?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q5\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"How much do you exercise in a week? \"\r\n      }\r\n    },\r\n    {\r\n    \"id\": \"q6\",\r\n    \"metadata\": {\r\n      \"answerType\": \"choice\",\r\n      \"title\": \"Wow! So I would say you are an exemplary student! Keep up the good work %username%!\"\r\n    }\r\n    },\r\n      {\r\n      \"id\": \"q7\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"Pretty impressive %username%!... Do you even have time for school?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q8\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"So no gaming, no exercising... hmmm what is left... are you more the 'party hard' type?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q9\",\r\n      \"metadata\": {\r\n        \"answerType\": \"choice\",\r\n        \"title\": \"Tell me %username%...are you happy with your grades?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q10\",\r\n      \"metadata\": {\r\n        \"answerType\": \"result\",\r\n        \"title\": \"Great! You are finished! Would you like to see the results?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"fn1\",\r\n      \"metadata\": {\r\n        \"title\": \"...\",\r\n        \"answerType\": \"result\",\r\n        \"isFinalNode\": true\r\n      }\r\n    }\r\n  ],\r\n  \"edges\": [\r\n    {\r\n      \"source\": \"q1\",\r\n      \"target\": \"q2\",\r\n      \"edgeId\": \"e1\",\r\n      \"metadata\": {\r\n        \"answer\": \"Bob\",\r\n        \"score\": 0\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q2\",\r\n      \"target\": \"q3\",\r\n      \"edgeId\": \"e2\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q2\",\r\n      \"target\": \"q4\",\r\n      \"edgeId\": \"e3\",\r\n      \"metadata\": {\r\n        \"answer\": \"No\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q4\",\r\n      \"edgeId\": \"e4\",\r\n      \"metadata\": {\r\n        \"answer\": \"Between 0 to 2 hours\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q4\",\r\n      \"edgeId\": \"e5\",\r\n      \"metadata\": {\r\n        \"answer\": \"Around 2 to 4 hours\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q7\",\r\n      \"edgeId\": \"e6\",\r\n      \"metadata\": {\r\n        \"answer\": \"I gave up counting the hours...\",\r\n        \"score\": -30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q4\",\r\n      \"target\": \"q5\",\r\n      \"edgeId\": \"e7\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes, I am!\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q4\",\r\n      \"target\": \"q6\",\r\n      \"edgeId\": \"e8\",\r\n      \"metadata\": {\r\n        \"answer\": \"No, I prefer minimum amount of movement...\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q5\",\r\n      \"target\": \"q7\",\r\n      \"edgeId\": \"e9\",\r\n      \"metadata\": {\r\n        \"answer\": \"Everyday!\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q5\",\r\n      \"target\": \"q6\",\r\n      \"edgeId\": \"e10\",\r\n      \"metadata\": {\r\n        \"answer\": \"Just once a week...\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q5\",\r\n      \"target\": \"q6\",\r\n      \"edgeId\": \"e11\",\r\n      \"metadata\": {\r\n        \"answer\": \"2 or 3 times a week\",\r\n        \"score\": 30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q7\",\r\n      \"target\": \"q9\",\r\n      \"edgeId\": \"e12\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes, no worries about that!\",\r\n        \"score\": 30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q7\",\r\n      \"target\": \"q9\",\r\n      \"edgeId\": \"e13\",\r\n      \"metadata\": {\r\n        \"answer\": \"What school?\",\r\n        \"score\": -30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q6\",\r\n      \"target\": \"q9\",\r\n      \"edgeId\": \"e14\",\r\n      \"metadata\": {\r\n        \"answer\": \"Thank you, I appreciate that!\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q6\",\r\n      \"target\": \"q8\",\r\n      \"edgeId\": \"e15\",\r\n      \"metadata\": {\r\n        \"answer\": \"Nah... school isn't really my thing!\",\r\n        \"score\": -30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q9\",\r\n      \"target\": \"q10\",\r\n      \"edgeId\": \"e16\",\r\n      \"metadata\": {\r\n        \"answer\": \"I wish... I need to study more...*sigh*\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q9\",\r\n      \"target\": \"q10\",\r\n      \"edgeId\": \"e17\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yeah, I couldn't be better! I am the next Einstein!\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q8\",\r\n      \"target\": \"q10\",\r\n      \"edgeId\": \"e18\",\r\n      \"metadata\": {\r\n        \"answer\": \"Oh yeah! Let's all get wasted!\",\r\n        \"score\": -30\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q8\",\r\n      \"target\": \"q10\",\r\n      \"edgeId\": \"e19\",\r\n      \"metadata\": {\r\n        \"answer\": \"No, let's just say I live by the words: You don't have to worry about life, if you don't have one...\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q10\",\r\n      \"target\": \"fn1\",\r\n      \"edgeId\": \"e20\",\r\n      \"metadata\": {\r\n        \"answer\": \"Sure! Let's see it!\",\r\n        \"score\": 0\r\n      }\r\n    }\r\n\t],\r\n\t\"recommendations\": [\r\n    {\r\n      \"type\": \"answerBased\",\r\n      \"data\": [\r\n        {\r\n          \"answerSet\": [\"e2\",\"e13\"],\r\n          \"recommendation\": \"<p><h5>The Hardcore Gamer<\/h5>Listen here! I think you have a real problem, so for your sake, just check out this page<a>www.gamequitters.com\/video-game-addiction-test-for-gamers\/<\/a><\/p>\"\r\n        },\r\n        {\r\n          \"answerSet\": [\"e2\",\"e13\"],\r\n          \"recommendation\": \"<p><h5>The Sports Freak<\/h5> How about slowing down a bit? Too much is never good, check out this page <a>www.huffingtonpost.com.au\/2017\/08\/06\/how-much-exercise-is-too-much_a_23064102\/<\/a> <\/p>\"\r\n        },\r\n        {\r\n          \"answerSet\": [\"e2, e7, e12, e16\"],\r\n          \"recommendation\": \"<p><h5>The Allrounder<\/h5> Wow, your really impressed me!...Finding time for everything, being good at school. How about you give me some advise? Tell me your secrets!<a>www.jerryjenkins.com\/how-to-write-a-book\/<\/a><\/p>\"\r\n        },\r\n        {\r\n          \"answerSet\": [\"e14, e16\"],\r\n          \"recommendation\": \"<p><h5>The Next Einstein<\/h5> I think you are ready for this...<a>www.admission.princeton.edu\/how-apply<\/a><\/p>\"\r\n        },\r\n        {\r\n          \"answerSet\": [\"e2\",\"e5\",\"e7\"],\r\n          \"recommendation\": \"<p><h5>The No Lifer <\/h5> Don't give up on yourself! Have a look at this page: <a>https:\/\/www.betterhelp.com\/advice\/general\/why-do-i-have-no-life\/<\/a><\/p>\"\r\n        }\r\n      ]\r\n    },\r\n    {\r\n      \"type\": \"scoreBased\",\r\n      \"data\": {\r\n        \"numberOfScorePartitions\": 5,\r\n        \"recommendations\": [\r\n          \"<p>The Hardcore Gamer<\/p>\",\r\n          \"<p>The Sports Freak<\/p>\",\r\n          \"<p>The Allrounder<\/p>\",\r\n          \"<p>The Next Einstein<\/p>\",\r\n\t        \"<p>The No Lifer<\/p>\"\r\n        ]\r\n      }\r\n    }\r\n  ]\r\n}";

  let createTestGraph = function (): Graph {
    let graph = GraphFactory.createGraphFromJSON(JSON_RECOMMENDATION_TEST);
    return graph;
  };

  let createScoreRecGen = function (graph: Graph, path: PathResult[]): ScoreBasedRecommendationsGenerator {
    return new ScoreBasedRecommendationsGenerator(graph.scoreBasedRecommendationConfig!,path,graph);
  };

  describe('contructor()', () => {
    it('should create a ScoreBasedRecommendationsGenerator object', () => {
      let graph: Graph = createTestGraph();
      let generator: ScoreBasedRecommendationsGenerator = createScoreRecGen(graph, []);
      expect(generator).toBeInstanceOf(ScoreBasedRecommendationsGenerator);
    });

    describe('generate()', () => {
      it('should throw if path is empty', () => {
        const emptyPath: PathResult[] = [];
        const graph: Graph = createTestGraph();
        const generator: ScoreBasedRecommendationsGenerator = createScoreRecGen(graph, emptyPath);

        expect(() => {
          generator.generate();
        }).toThrow();
      });

      it('should return the recommendation 1 if a certain path is taken', () => {
        let graph:Graph = GraphFactory.createGraphFromJSON(JSON_RECOMMENDATION_TEST);
        let graphIterator: GraphIteratorInterface = createIterator(GraphIterator, graph);

        graphIterator.choose("e1");
        graphIterator.choose("e2");
        graphIterator.choose("e6");
        graphIterator.choose("e13");
        graphIterator.choose("e16");
        let path: PathResult[] = graphIterator.getPath();

        const generator: ScoreBasedRecommendationsGenerator = createScoreRecGen(graph, path);
        expect(generator.generate()[0].includes("The Hardcore Gamer")).toBeTruthy();
        expect(generator.score).toEqual(-80);
      });

      it('should return the recommendation 4 if a certain path is taken', () => {
        let graph = GraphFactory.createGraphFromJSON(JSON_RECOMMENDATION_TEST);
        let graphIterator: GraphIteratorInterface = createIterator(GraphIterator, graph);

        graphIterator.choose("e1");
        graphIterator.choose("e3");
        graphIterator.choose("e7");
        graphIterator.choose("e11");
        graphIterator.choose("e14");
        graphIterator.choose("e17");
        let path: PathResult[] = graphIterator.getPath();

        const generator: ScoreBasedRecommendationsGenerator = createScoreRecGen(graph, path);
        expect(generator.generate()[0].includes("The No Lifer")).toBeTruthy();
        expect(generator.score).toEqual(70);
   });

    });
  });
});
