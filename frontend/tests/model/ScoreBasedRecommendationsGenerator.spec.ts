import { RecommendationsGeneratorInterface , createRecommendationsGenerator} from '../../src/model/Graph/Recommendations/RecommendationsGenerator';
import { ScoreBasedRecommendationsGenerator } from '../../src/model/Graph/Recommendations/ScoreBasedRecommendationsGenerator';
import { GraphFactory } from '../../src/model/Graph/GraphFactory';
import { Graph } from '../../src/model/Graph/Graph';

describe('ScoreBasedRecommendationsGenerator', () => {

  let createMinimumViableGraph = function (): Graph {
      let graph = GraphFactory.createTestGraph();
      return graph;
  };

  describe('contructor()', () => {
    it('should create an ScoreBasedRecommendationsGenerator object', () => {
      /*let graphIterator = new GraphIterator(createMinimumViableGraph());
      let scoreBasedRecGen: ScoreBasedRecommendationsGenerator = createRecommendationsGenerator(ScoreBasedRecommendationsGenerator, '', graphIterator);
      expect(scoreBasedRecGen).toBeInstanceOf(ScoreBasedRecommendationsGenerator);*/
    });
  });



});
