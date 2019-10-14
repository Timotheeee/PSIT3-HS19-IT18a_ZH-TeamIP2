import {JSONNode} from './JSONNode.ts';
import {JSONEdge} from './JSONEdge.ts';

export interface JSONGraph {
  nodes: JSONNode[],
  edges: JSONEdge[]
}
