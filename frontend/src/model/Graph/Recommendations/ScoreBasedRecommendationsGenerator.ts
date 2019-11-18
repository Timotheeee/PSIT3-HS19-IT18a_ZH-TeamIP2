import { RecommendationsGenerator } from "./RecommendationsGenerator";
import { MyGraphIterator } from "./MyGraphIterator";

export class ScoreBasedRecommendationsGenerator implements RecommendationsGenerator {
  json: string;
  graphIterator: MyGraphIterator;

  constructor(json: string, graphIterator: MyGraphIterator) {
    this.json = json;
    this.graphIterator = graphIterator;
  };

  public generate(): string[] {
    // implement generate function

    return [""];
  }
}
