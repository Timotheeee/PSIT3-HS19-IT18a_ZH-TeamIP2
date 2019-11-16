import { RecommendationsGenerator , createRecommendationsGenerator} from "../../src/model/RecommendationsGenerator";
import { ScoreBasedRecommendationsGenerator } from "../../src/model/ScoreBasedRecommendationsGenerator";
import { MyGraphIterator } from "../../src/model/MyGraphIterator";
import { GraphFactory } from "../../src/model/GraphFactory";
import { Graph } from "../../src/model/Graph";

describe("ScoreBasedRecommendationsGenerator", () => {

  let createMinimumViableGraph = function (): Graph {
      let graph = GraphFactory.createTestGraph();
      return graph;
  };

  describe("test ScoreBasedRecommendationsGenerator creation", () => {
    test("should create an ScoreBasedRecommendationsGenerator object", () => {
      let graphIterator = new MyGraphIterator(createMinimumViableGraph());
      let scoreBasedRecGen: ScoreBasedRecommendationsGenerator = createRecommendationsGenerator(ScoreBasedRecommendationsGenerator, "", graphIterator);
      expect(scoreBasedRecGen).toBeInstanceOf(ScoreBasedRecommendationsGenerator);
    });
  });

});
