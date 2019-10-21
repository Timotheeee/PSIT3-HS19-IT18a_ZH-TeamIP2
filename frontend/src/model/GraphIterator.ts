import {Node} from './Node';
import { Graph } from '../Graph';

export interface GraphIterator {
    currentNode: Node;
    catalogue: Graph;

    new (catalogue: Graph): GraphIterator;

    // TODO: ryan: yeah man you will probably need object types for answers ..
    answersForCurrentNode(): [String];
    choose(chosenAnswer: String): void;
    isFinalNode(): boolean;
}