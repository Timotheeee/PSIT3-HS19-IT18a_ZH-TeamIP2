import { Graph } from "./model/Graph";

export interface GraphIterator {
    currentNode: Node;
    catalogue: Graph;

    // TODO: ryan: yeah man you will probably need object types for answers ..
    answersForCurrentNode(): [String];
    choose(chosenAnswer: String): void;
    isFinalNode(): boolean;
}

export class MyGraphIterator implements GraphIterator {
    currentNode: Node;
    catalogue: Graph;
    
    constructor(catalogue: Graph) {
        return null;
    }

    answersForCurrentNode(): [String] {
        throw new Error("Method not implemented.");
    }
    choose(chosenAnswer: String): void {
        throw new Error("Method not implemented.");
    }
    isFinalNode(): boolean {
        throw new Error("Method not implemented.");
    }


}