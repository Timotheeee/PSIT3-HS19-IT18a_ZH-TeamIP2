import {GraphFactory} from "../../src/model/GraphFactory";
import { Graph } from "../../src/model/Graph";

describe("MyGraphIterator", () => {
  // TODO: ryan having this const duplicated in code is bad!
  const minJSONGraph1Str = "{\r\n  \"nodes\": [\r\n    {\r\n      \"id\": \"h\",\r\n      \"metadata\": {\r\n        \"isHead\": true,\r\n    \t  \"title\" : \"\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q1\",\r\n      \"metadata\": {\r\n    \t  \"title\" : \"Do you play video games?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q2\",\r\n      \"metadata\": {\r\n    \t  \"title\" : \"Do you play League of Legends or World of Warcraft Classic?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q3\",\r\n      \"metadata\": {\r\n    \t  \"title\" : \"Do you exercise at least twice a week?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q4\",\r\n      \"metadata\": {\r\n    \t  \"title\" : \"Do you get more than 7 hours of sleep every night?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"fn\",\r\n      \"metadata\": {\r\n        \"isFinalNode\" : true,\r\n    \t  \"title\" : \"\"\r\n      }\r\n    }\r\n  ],\r\n  \"edges\": [\r\n    {\r\n      \"source\": \"h\",\r\n      \"target\": \"q1\"\r\n    },\r\n    {\r\n      \"source\": \"q1\",\r\n      \"target\": \"q2\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q1\",\r\n      \"target\": \"q3\",\r\n      \"metadata\": {\r\n        \"answer\": \"No\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q2\",\r\n      \"target\": \"q4\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes, Riven is my Bae!\",\r\n        \"score\": -1000\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q2\",\r\n      \"target\": \"q4\",\r\n      \"metadata\": {\r\n        \"answer\": \"No, I play CS GO instead xD\",\r\n        \"score\": 1000\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q4\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes, I am a true gym rat!\",\r\n        \"score\": 200\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q4\",\r\n      \"metadata\": {\r\n        \"answer\": \"No less than that\",\r\n        \"score\": 0\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q4\",\r\n      \"target\": \"fn\"\r\n    }\r\n  ]\r\n}";

    describe("test createGraphFromJSON", () =>{
        test("should create a Graph object when called  with viable params.", () => {
            let graphFromJSON: Graph = GraphFactory.createGraphFromJSON(minJSONGraph1Str);
            expect(graphFromJSON).toBeInstanceOf(Graph);
        });
    });
  });
