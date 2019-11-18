<<<<<<< HEAD
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
=======
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
>>>>>>> Change stuff
}
