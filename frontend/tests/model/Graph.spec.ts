import {Graph} from "./../../src/model/Graph";
import {Node} from "./../../src/model/Node";

describe("graph", () => {
  let graph: Graph = new Graph();
  beforeEach(() => {
    graph = new Graph();
  })

  describe("is graph working correctly", () => {
    it("adds a node correctly", () => {
      expect(graph.addNode("1", "dummy").getId()).toBe("1");
    })

    it("adds multiple nodes correctly", () => {
      graph.addNode("1", "dummy");
      graph.addNode("2", "dummy");
      graph.addNode("3", "dummy");
      expect(graph.getNodes().length).toBe(3);
      expect(graph.getNodes()[0].getId()).toBe("1");
      expect(graph.getNodes()[1].getId()).toBe("2");
      expect(graph.getNodes()[2].getId()).toBe("3");
    })

    it("finds an existing node correctly", () => {
      graph.addNode("1", "dummy");
      expect(graph.findNode("1").getId()).toBe("1");
    })

    it("doesn't find non-existing nodes", () => {
      expect(graph.findNode("2")).toBeNull();
    })

    it("adds a single edge correctly to a node", () => {
      graph.addNode("q1", "dummy");
      graph.addNode("q2", "dummy");
      graph.addEdge("q1", "q2", "dummyAnswer", 1);
      expect(graph.getNodes()[0].getEdges()[0].getAnswer()).toBe("dummyAnswer");
    })

    it("adds multiple edges correctly to a node", () => {
      graph.addNode("q1", "dummy");
      graph.addNode("q2", "dummy");
      graph.addNode("q3", "dummy");
      graph.addEdge("q1", "q2", "dummyAnswer1", 1);
      graph.addEdge("q1", "q3", "dummyAnswer2", -1);
      expect(graph.getNodes()[0].getEdges()[0].getAnswer()).toBe("dummyAnswer1");
      expect(graph.getNodes()[0].getEdges()[1].getAnswer()).toBe("dummyAnswer2");
    })
  })
})
