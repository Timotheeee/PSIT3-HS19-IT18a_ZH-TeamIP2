import { Graph } from './Graph';

export class GraphTools  {

    public static getExtremas(graph:Graph): number[]{
        return [-80, 70];
    }

  /**
   * Converts a student's score (an integer) into non-negative, rounded number (Range: 0 - 100)
   * @param score The student's score
   * @param min The lowest score possible
   * @param max The highest score possible
   * @return percentage The number representing the percentage of the student's score
   */
    public static convertScoreToPercentage(score: number, min: number, max: number): number {
      let percentage: number = 0;
      let absScore: number = Math.abs(min - score);
      let scoreRange = max - min;
      percentage = Math.round(absScore * 100 / scoreRange);
      return percentage;
    }
}
