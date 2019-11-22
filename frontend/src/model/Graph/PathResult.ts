import { Node } from './Node';
import { Edge } from './Edge';

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