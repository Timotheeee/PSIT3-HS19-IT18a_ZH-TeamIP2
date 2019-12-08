/**
 * RecommendationsInterface defines objects that can be used to create recommendation output.
 *
 */
export interface RecommendationGeneratorInterface {
  /**
   * returns: string[], this may consist of HTML formatted text!
   */
  generate(): string[];
}
