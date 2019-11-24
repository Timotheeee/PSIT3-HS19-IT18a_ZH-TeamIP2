import { RecommendationsGeneratorInterface , createRecommendationsGenerator } from '../../src/model/Graph/Recommendations/RecommendationsGenerator';
import { ScoreBasedRecommendationsGenerator } from '../../src/model/Graph/Recommendations/ScoreBasedRecommendationsGenerator';
import { GraphIterator, GraphIteratorInterface, createIterator } from '../../src/model/Graph/GraphIterator';
import { GraphFactory } from '../../src/model/Graph/GraphFactory';
import { Graph } from '../../src/model/Graph/Graph';
import { PathResult } from '../../src/model/Graph/PathResult';

describe('ScoreBasedRecommendationsGenerator', () => {
  //const JSON_RECOMMENDATION_TEST = "{\r\n\r\n        \"numberOfScorePartitions\": 4,\r\n\r\n        \"recommendations\": [\r\n\r\n          \"<p>lorem ipsum 1<\/p>\",\r\n\r\n          \"<p>lorem ipsum 2<\/p>\",\r\n\r\n          \"<p>lorem ipsum 3<\/p>\",\r\n\r\n          \"<p>lorem ipsum 4<\/p>\"\r\n\r\n        ]\r\n\r\n      }";
  const JSON_RECOMMENDATION_TEST: string = "{\"numberOfScorePartitions\":4,\"recommendations\":[\"<p>lorem ipsum 1</p>\",\"<p>lorem ipsum 2</p>\",\"<p>lorem ipsum 3</p>\",\"<p>lorem ipsum 4</p>\"]}";

  const JSON_GRAPH_TEST: string = "{\"nodes\":[{\"id\":\"q1\",\"metadata\":{\"isHead\":true,\"answerType\":\"input\",\"title\":\"Hey thanks for testing out StudentScore! Do you wanna tell me your name? If not I''ll just call you Bob\"}},{\"id\":\"q2\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"Do you play video games?\"}},{\"id\":\"q3\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"Ah I see you are a person of culture as well %username%. Do you play League of Legends or World of Warcraft Classic?\"}},{\"id\":\"q4\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"Do you exercise at least twice a week?\"}},{\"id\":\"q5\",\"metadata\":{\"answerType\":\"choice\",\"title\":\"Do you get more than 7 hours of sleep every night?\"}},{\"id\":\"fn1\",\"metadata\":{\"title\":\"Great! You are finished! Would you like to see the results?\",\"answerType\":\"result\",\"isFinalNode\":true}}],\"edges\":[{\"source\":\"q1\",\"target\":\"q2\",\"edgeId\":\"e1\",\"metadata\":{\"answer\":\"Bob\",\"score\":0}},{\"source\":\"q2\",\"target\":\"q3\",\"edgeId\":\"e2\",\"metadata\":{\"answer\":\"Yes\",\"score\":-10}},{\"source\":\"q2\",\"target\":\"q4\",\"edgeId\":\"e3\",\"metadata\":{\"answer\":\"No\",\"score\":10}},{\"source\":\"q3\",\"target\":\"q5\",\"edgeId\":\"e4\",\"metadata\":{\"answer\":\"Yes\",\"score\":-1000}},{\"source\":\"q3\",\"target\":\"q5\",\"edgeId\":\"e5\",\"metadata\":{\"answer\":\"I play other games\",\"score\":-200}},{\"source\":\"q4\",\"target\":\"q5\",\"edgeId\":\"e6\",\"metadata\":{\"answer\":\"Yes, I am a true gym rat!\",\"score\":200}},{\"source\":\"q4\",\"target\":\"q5\",\"edgeId\":\"e7\",\"metadata\":{\"answer\":\"No less than that\",\"score\":0}},{\"source\":\"q5\",\"target\":\"fn1\",\"edgeId\":\"e8\",\"metadata\":{\"answer\":\"Yes, I love my bed!\",\"score\":500}},{\"source\":\"q4\",\"target\":\"fn1\",\"edgeId\":\"e9\",\"metadata\":{\"answer\":\"No, I like Netflix way too much :(\",\"score\":-500}}],\"recommendations\":[{\"type\":\"answerBased\",\"data\":[{\"answerSet\":[\"e1\",\"e2\",\"e3\"],\"recommendation\":\"<p>lorem ipsum a</p>\"},{\"answerSet\":[\"e2\",\"e4\"],\"recommendation\":\"<p>lorem ipsum b</p>\"},{\"answerSet\":[\"e5\"],\"recommendation\":\"<p>lorem ipsum c</p>\"},{\"answerSet\":[\"e2\",\"e5\",\"e7\"],\"recommendation\":\"<p>lorem ipsum d</p>\"}]},{\"type\":\"scoreBased\",\"data\":{\"numberOfScorePartitions\":4,\"recommendations\":[\"<p>lorem ipsum 1</p>\",\"<p>lorem ipsum 2</p>\",\"<p>lorem ipsum 3</p>\",\"<p>lorem ipsum 4</p>\"]}}]}";

  let createTestGraph = function (): Graph {
    //let graph = GraphFactory.createGraphFromJSON(JSON_GRAPH_TEST);
    let graph = GraphFactory.createTestGraph();
    return graph;
  };

  let createTestGenerator = function (): RecommendationsGeneratorInterface {
      let graph: Graph = GraphFactory.createTestGraph();
      let graphIterator: GraphIteratorInterface = createIterator(GraphIterator, graph);
      let path: PathResult[] = [];
      return createRecommendationsGenerator(ScoreBasedRecommendationsGenerator, JSON_RECOMMENDATION_TEST, path, graph);
  };

  describe('contructor()', () => {
    it('should create a ScoreBasedRecommendationsGenerator object', () => {
      let scoreBasedRecGen: RecommendationsGeneratorInterface =
        createRecommendationsGenerator(ScoreBasedRecommendationsGenerator, JSON_RECOMMENDATION_TEST, [], createTestGraph());
      expect(scoreBasedRecGen).toBeInstanceOf(ScoreBasedRecommendationsGenerator);
    });

    describe('generate()', () => {
      it('should throw if path is empty', () => {
        const path: PathResult[] = [];
        let generator = createRecommendationsGenerator(ScoreBasedRecommendationsGenerator, JSON_RECOMMENDATION_TEST,
                                                       path, createTestGraph());

        expect(() => {
          generator.generate();
        }).toThrow();
      });

      it('should return the recommendation 1 if a certain path is taken', () => {
        let graph: Graph = GraphFactory.createTestGraph();
        let graphIterator: GraphIteratorInterface = createIterator(GraphIterator, graph);
        graphIterator.choose("e1");
        graphIterator.choose("e3");
        graphIterator.choose("e5");
        let path: PathResult[] = graphIterator.getPath();

        let scoreBasedRecGen: RecommendationsGeneratorInterface =
        createRecommendationsGenerator(ScoreBasedRecommendationsGenerator, JSON_RECOMMENDATION_TEST, path, graph);
        expect(scoreBasedRecGen.generate()).toBe("<p>lorem ipsum 1</p>");
      });

      it('should return the recommendation 4 if a certain path is taken', () => {
        let graph: Graph = GraphFactory.createTestGraph();
        let graphIterator: GraphIteratorInterface = createIterator(GraphIterator, graph);
        graphIterator.choose("e2");
        graphIterator.choose("e4");
        graphIterator.choose("e6");
        let path: PathResult[] = graphIterator.getPath();

        let scoreBasedRecGen: RecommendationsGeneratorInterface =
        createRecommendationsGenerator(ScoreBasedRecommendationsGenerator, JSON_RECOMMENDATION_TEST, path, graph);
        expect(scoreBasedRecGen.generate()).toBe("<p>lorem ipsum 1</p>");
      });
    });

  });

});
