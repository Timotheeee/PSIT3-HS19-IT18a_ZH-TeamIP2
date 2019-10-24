import { MyGraphIterator } from "../../src/MyGraphIterator";
import { GraphIterator } from "../../src/MyGraphIterator";
import { GraphFactory } from "../../src/model/GraphFactory";
import { Graph } from "../../src/model/Graph";


describe("MyGraphIterator", function() {    
    const minJSONGraph1Str = "graph = {\r\n  \"nodes\": [\r\n    {\r\n      \"id\": \"h\",\r\n      \"metadata\": {\r\n          \"isHead\": true,\r\n    \t  \"title\" : \"\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q1\",\r\n      \"metadata\": {\r\n    \t  \"title\" : \"Do you play video games?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q2\",\r\n      \"metadata\": {\r\n    \t  \"title\" : \"Do you play League of Legends or World of Warcraft Classic?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q3\",\r\n      \"metadata\": {\r\n    \t  \"title\" : \"Do you exercise at least twice a week?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"q4\",\r\n      \"metadata\": {\r\n    \t  \"title\" : \"Do you get more than 7 hours of sleep every night?\"\r\n      }\r\n    },\r\n    {\r\n      \"id\": \"fn\",\r\n      \"metadata\": {\r\n          \"isFinalNode\" : true,\r\n    \t  \"title\" : \"\"\r\n      }\r\n    }\r\n  ],\r\n  \"edges\": [\r\n    \/\/ Edge from H to Q1\r\n    {\r\n      \"source\": \"h\",\r\n      \"target\": \"q1\",\r\n    },\r\n    \/\/ Edges for Questions do you play video games\r\n    {\r\n      \"source\": \"q1\",\r\n      \"target\": \"q2\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes\",\r\n        \"score\": -10\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q1\",\r\n      \"target\": \"q3\",\r\n      \"metadata\": {\r\n        \"answer\": \"No\",\r\n        \"score\": 10\r\n      }\r\n    },\r\n    \/\/ Edges from Lol and Wow question    \r\n    {\r\n      \"source\": \"q2\",\r\n      \"target\": \"q4\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes, Riven is my Bae!\",\r\n        \"score\": -1000\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q2\",\r\n      \"target\": \"q4\",\r\n      \"metadata\": {\r\n        \"answer\": \"No, I play CS GO instead xD\",\r\n        \"score\": 1000\r\n      }\r\n    },\r\n    \/\/ Edges from the exercise question\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q4\",\r\n      \"metadata\": {\r\n        \"answer\": \"Yes, I am a true gym rat!\",\r\n        \"score\": 200\r\n      }\r\n    },\r\n    {\r\n      \"source\": \"q3\",\r\n      \"target\": \"q4\",\r\n      \"metadata\": {\r\n        \"answer\": \"No less than that\",\r\n        \"score\": 0\r\n      }\r\n    },\r\n    \/\/ From q4 to final node\r\n    {\r\n      \"source\": \"q4\",\r\n      \"target\": \"fn\",\r\n    }    \r\n  ]\r\n}\r\n";
    const q1Text = "Do you play video games?";
    const q2Text = "Do you play League of Legends or Wow Classic?";
    const q3Text = "Do you sleep at least 7 hours a day?";
    const q4Text = "Do you get at least 7 hours sleep each night?";


    let createMinimumViableGraph = function (): Graph {        
        let graph = Graph.createGraphFromJSON(minJSONGraph1Str);
        return graph;
    };

    beforeEach(function() {
        //graphIterator = null;
    });

    describe("test gaming graph: left path", () =>{
        it("should return the first question", () => {
            let graphIterator = new MyGraphIterator(createMinimumViableGraph());
            graphIterator.getCurrentNode().question.toBe(q1Text);
            graphIterator.choose("q2");
            
            graphIterator.getCurrentNode().question.toBe(q2Text);
            graphIterator.choose("q4");

            graphIterator.getCurrentNode().question.toBe(q4Text);
            graphIterator.choose("fn");

            graphIterator.getCurrentNode.IsFinalNode().toBe(true);                        
        });
    });


});