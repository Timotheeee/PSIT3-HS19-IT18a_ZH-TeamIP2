import { MyGraphIterator } from "./MyGraphIterator";

export interface RecommendationsGeneratorConstructor {
  new (json: string, graphIterator: MyGraphIterator): RecommendationsGenerator;
}

export interface RecommendationsGenerator {
  json: string;
  graphIterator: MyGraphIterator;

  generate(): string[];
}

export function createRecommendationsGenerator(ctor: RecommendationsGeneratorConstructor, json: string, graphIterator: MyGraphIterator): RecommendationsGenerator {
    return new ctor(json, graphIterator);
}
