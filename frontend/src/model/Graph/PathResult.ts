import { Node } from './Node';
import { Edge } from './Edge';

/**
 * Represents a single step in a graph.
 * An array of PathResult accurately and completely describes the path that was taken.
 */
export class PathResult {
    readonly _node: Node;
    readonly _decision: Edge|null;

    constructor(node: Node, decision: Edge|null) {
        this._node = node;
        this._decision = decision;
    }

    get node(): Node { return this._node;  }
    get decision(): Edge|null { return this._decision; }
}
