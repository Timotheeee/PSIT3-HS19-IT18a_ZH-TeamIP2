import { GraphIterator } from "./MyGraphIterator";

export interface RecommendationsGenerator {
  json: string;
  gi: GraphIterator;

  constructor(json: string, gi : GraphIterator): void;

  generate(): string[];
}
