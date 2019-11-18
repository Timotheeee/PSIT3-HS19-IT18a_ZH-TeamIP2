import { GraphIterator } from "./Graph/GraphIterator";

export interface RecommendationsGeneratorInterfaceConstructor {
  new (json: string, graphIterator: GraphIterator): RecommendationsGeneratorInterface;
}

export interface RecommendationsGeneratorInterface {
  json: string;
  graphIterator: GraphIterator;

  generate(): string[];
}

export function createRecommendationsGeneratorInterface(ctor: RecommendationsGeneratorInterfaceConstructor, json: string,
  graphIterator: GraphIterator): RecommendationsGeneratorInterface {
    return new ctor(json, graphIterator);
}
