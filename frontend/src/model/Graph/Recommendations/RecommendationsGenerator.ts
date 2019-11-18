<<<<<<< HEAD
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
<<<<<<< HEAD
  path: PathResult[], graph: Graph): RecommendationsGeneratorInterface {
    return new ctor(json, path, graph);
=======
import { GraphIterator } from "./Graph/GraphIterator";
=======
import { GraphIterator } from '../GraphIterator';
import { Graph } from '../Graph';
import { PathResult } from '../PathResult';
>>>>>>> -change recommendation interface to use PathResult over GraphIterator

export interface RecommendationsGeneratorConstructor {
  new (json: string, path: PathResult[], graph: Graph): RecommendationsGeneratorInterface;
}

export interface RecommendationsGeneratorInterface {
  generate(): string[];
}

<<<<<<< HEAD
export function createRecommendationsGeneratorInterface(ctor: RecommendationsGeneratorInterfaceConstructor, json: string,
  graphIterator: GraphIterator): RecommendationsGeneratorInterface {
    return new ctor(json, graphIterator);
>>>>>>> Change stuff
=======
export function createRecommendationsGeneratorInterface(ctor: RecommendationsGeneratorConstructor, json: string,
=======
>>>>>>> prepare unit tests for michael to continue on ...
  path: PathResult[], graph: Graph):RecommendationsGeneratorInterface {
    return new ctor(json, path, graph);
>>>>>>> -change recommendation interface to use PathResult over GraphIterator
}
