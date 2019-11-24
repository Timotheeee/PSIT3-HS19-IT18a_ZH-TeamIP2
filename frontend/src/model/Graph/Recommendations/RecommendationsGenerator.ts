import { GraphIterator } from '../GraphIterator';
import { Graph } from '../Graph';
import { PathResult } from '../PathResult';

export interface RecommendationsGeneratorConstructor {
  new (json: string, path: PathResult[], graph: Graph): RecommendationsGeneratorInterface;
}

export interface RecommendationsGeneratorInterface {
  generate(): string[];
}

export function createRecommendationsGenerator(ctor: RecommendationsGeneratorConstructor, json: string,
  path: PathResult[], graph: Graph): RecommendationsGeneratorInterface {
    return new ctor(json, path, graph);
}
