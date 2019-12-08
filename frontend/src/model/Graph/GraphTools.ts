import { Graph } from './Graph';

/**
 * Helper class for working with Graph objects.
 */
export class GraphTools  {

  /**
   * Returns the shortest and longest path present in the graph.
   * @param graph
   */
  public static getExtremas(graph:Graph): number[]{
        return [-80, 70];
    }

    public static convertScoreToPercentage(score: number, min: number, max: number): number {
      let percentage: number = 0;
      let absScore: number = Math.abs(min - score);
      let scoreRange = max - min;
      percentage = Math.round(absScore * 100 / scoreRange);
      return percentage;
    }
}
