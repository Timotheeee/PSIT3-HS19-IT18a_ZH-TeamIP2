import { Node } from './Node';
import { Edge } from './Edge';

export class PathResult {
    readonly _node: Node;
    readonly _decision: Edge|null;

    constructor(node: Node, decision: Edge|null) {
        this._node = node;
        this._decision = decision;
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Cherry-pick Ryan's changes to PathResult
    get node(): Node { return this._node;  }
    get decision(): Edge|null { return this._decision; }

}
<<<<<<< HEAD
=======
    get decision(): Edge { return this._decision; }
}
>>>>>>> -change recommendation interface to use PathResult over GraphIterator
=======
>>>>>>> Cherry-pick Ryan's changes to PathResult
