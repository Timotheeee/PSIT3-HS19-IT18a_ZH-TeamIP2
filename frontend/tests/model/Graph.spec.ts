import {Graph} from './../../src/model/Graph/Graph';
import {Node} from './../../src/model/Graph/Node';
import { Edge } from '../../src/model/Graph/Edge';

describe('Graph', () => {
  let graph: Graph = new Graph();

  beforeEach(() => {
    graph = new Graph();
  });

  describe('constructor()', ()  => {
    it('should work, nothing to test here yet ...', () => {
      expect(() => {new Graph()}).toEqual(expect.anything());
    });
  });

  describe('addNode()', () => {
    it('should work on an empty graph.', () => {
      graph.addNode(new Node('q1', 'How old are you'));
    });

    it('should throw if a node witht the same nodeId already exists', () => {
      let node2Add: Node = new Node('q1', 'How old are you');
      graph.addNode(node2Add);

      expect(() => { 
        graph.addNode(node2Add);
      }).toThrow();
    });
  });

  describe('addEdge()' , () => {
    it('should work if source and target do exist', () => {
      let node1: Node = new Node('q1', 'How old are you');
      let node2: Node = new Node('q2', 'Do you prefer dogs to cats?');      
      graph.addNode(node1);
      graph.addNode(node2);

      let edge2Add: Edge = new Edge('e1', node1, node2, 'I\m 17 years old', 0);

      expect(() => {
        graph.addEdge(edge2Add);
      }).toEqual(expect.anything());
    });

    it('should throw if source does not exist', () => {
      let node1: Node = new Node('q1', 'How old are you');
      let node2: Node = new Node('q2', 'Do you prefer dogs to cats?');      
      graph.addNode(node2);
      
      let edge2Add: Edge = new Edge('e1', node1, node2, 'I\m 17 years old', 0);

      expect(() => {
        graph.addEdge(edge2Add);
      }).toThrow();
    });

    it('should throw if target does not exist', () => {
      let node1: Node = new Node('q1', 'How old are you');
      let node2: Node = new Node('q2', 'Do you prefer dogs to cats?');      
      graph.addNode(node1);
      
      let edge2Add: Edge = new Edge('e1', node1, node2, 'I\m 17 years old', 0);

      expect(() => {
        graph.addEdge(edge2Add);
      }).toThrow();
    });
  });

  describe('findNode()', () => {
    it('should return null if called on an empty graph.', () => {
      expect(graph.findNode('q9999')).toBeNull();
    });

    it('should return null if no node exists in the collection that matches nodeId.', () => {
      let node2Add: Node = new Node('q1', 'How old are you');

      expect(graph.findNode('q99999')).toBeNull();
    });

    it('should return the node matching nodeId', () => {
      let node2Add1: Node = new Node('q1', 'How old are you');
      let node2Add2: Node = new Node('q2', 'Do you prefer dogs to cats?');
      let node2Add3: Node = new Node('q3', 'Would you like to own a motorcycle?');

      graph.addNode(node2Add1); 
      graph.addNode(node2Add2); 
      graph.addNode(node2Add3); 

      let actual:Node|null = graph.findNode('q3');
      expect(actual).not.toBeNull();
    });

  });
    
});