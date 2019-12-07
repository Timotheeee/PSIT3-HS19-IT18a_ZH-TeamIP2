import { RecommendationsGeneratorInterface , createRecommendationsGenerator } from '../../src/model/Graph/Recommendation/RecommendationsGenerator';
import { ScoreBasedRecommendationsGenerator } from '../../src/model/Graph/Recommendation/ScoreBasedRecommendationsGenerator';
import { GraphIterator, GraphIteratorInterface, createIterator } from '../../src/model/Graph/GraphIterator';
import { GraphFactory } from '../../src/model/Graph/GraphFactory';
import { Graph } from '../../src/model/Graph/Graph';
import { PathResult } from '../../src/model/Graph/PathResult';

describe('ScoreBasedRecommendationsGenerator', () => {
  const JSON_RECOMMENDATION_TEST: string = "{\"numberOfScorePartitions\":4,\"recommendations\":[\"<p>lorem ipsum 1</p>\",\"<p>lorem ipsum 2</p>\",\"<p>lorem ipsum 3</p>\",\"<p>lorem ipsum 4</p>\"]}";

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
