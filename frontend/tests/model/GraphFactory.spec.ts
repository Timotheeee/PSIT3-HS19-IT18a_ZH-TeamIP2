import {GraphFactory} from "../../src/model/GraphFactory";
import { Graph } from "../../src/model/Graph";

describe("MyGraphIterator", () => {
    describe("test createGraphFromJSON", () =>{
        test("should create a Graph object when called  with viable params.", () => {
            let graphFromJSON: Graph = GraphFactory.createTestGraph();
            expect(graphFromJSON).toBeInstanceOf(Graph);
        });
    });
  });