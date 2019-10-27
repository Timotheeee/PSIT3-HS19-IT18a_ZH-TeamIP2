export class Result {
  private score: number;
  private recommendations: string[];

  constructor(score: number, recommendations: string[]) {
    this.score = score;
    this.recommendations = recommendations;
  }

  public addRecommendation(recommendation: string) {
    this.recommendations.push(recommendation);
  }

  public getScore(): number {
    return this.score
  }

  public getRecommendations(): string[] {
    return this.recommendations;
  }
}
