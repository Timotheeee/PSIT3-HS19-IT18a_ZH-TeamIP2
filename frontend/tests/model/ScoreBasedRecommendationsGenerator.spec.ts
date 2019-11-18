import { RecommendationsGeneratorInterface , createRecommendationsGenerator} from '../../src/model/Graph/Recommendations/RecommendationsGenerator';
import { ScoreBasedRecommendationsGenerator } from '../../src/model/Graph/Recommendations/ScoreBasedRecommendationsGenerator';
import { GraphFactory } from '../../src/model/Graph/GraphFactory';
import { Graph } from '../../src/model/Graph/Graph';
import { PathResult } from '../../src/model/Graph/PathResult';

describe('ScoreBasedRecommendationsGenerator', () => {
  const JSON_RECOMMENDATION_TEST = "{\r\n\r\n        \"numberOfScorePartitions\": 4,\r\n\r\n        \"recommendations\": [\r\n\r\n          \"<p>lorem ipsum 1<\/p>\",\r\n\r\n          \"<p>lorem ipsum 2<\/p>\",\r\n\r\n          \"<p>lorem ipsum 3<\/p>\",\r\n\r\n          \"<p>lorem ipsum 4<\/p>\"\r\n\r\n        ]\r\n\r\n      }";

  let createTestGraph = function (): Graph {
    let graph = GraphFactory.createTestGraph();
    return graph;
  };
  /*let createTestGenerator = function (): ScoreBasedRecommendationsGenerator {
      let graph:Graph = GraphFactory.createTestGraph();
      //return createRecommendationsGenerator(ScoreBasedRecommendationsGenerator, )
  };*/

  describe('contructor()', () => {
    it('should create an ScoreBasedRecommendationsGenerator object', () => {
      /*let graphIterator = new GraphIterator(createMinimumViableGraph());
      let scoreBasedRecGen: ScoreBasedRecommendationsGenerator = createRecommendationsGenerator(ScoreBasedRecommendationsGenerator, '', graphIterator);
      expect(scoreBasedRecGen).toBeInstanceOf(ScoreBasedRecommendationsGenerator);*/
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

      it('')
    });
    
  });

});
