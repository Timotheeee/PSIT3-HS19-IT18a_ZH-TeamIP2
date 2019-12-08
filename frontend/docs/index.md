## Classes

<dl>
<dt><a href="#Answer">Answer</a></dt>
<dd><p>Vue viewmodel.</p></dd>
<dt><a href="#Question">Question</a></dt>
<dd><p>Vue viewmodel.</p></dd>
<dt><a href="#Result">Result</a></dt>
<dd><p>Vue viewmodel.</p></dd>
<dt><a href="#Edge">Edge</a></dt>
<dd><p>Represents a connection between two vertices (nodes) in a graph.
Can be parsed from JSON.</p></dd>
<dt><a href="#Graph">Graph</a></dt>
<dd><p>Represents a graph data structure optimized for this application.
Currently, it contains the config for the recommendation generators. This should be moved in the next iteration.
Can be parsed from JSON.</p></dd>
<dt><a href="#GraphFactory">GraphFactory</a></dt>
<dd><p>Creates instances of the Graph object for a json string.
Handles the JSON parsing.</p></dd>
<dt><a href="#GraphIterator">GraphIterator</a></dt>
<dd><p>Graph implementation of GraphIteratorInterface</p></dd>
<dt><a href="#GraphTools">GraphTools</a></dt>
<dd><p>Helper class for working with Graph objects.</p></dd>
<dt><a href="#PathResult">PathResult</a></dt>
<dd><p>Represents a single step in a graph.
An array of PathResult accurately and completely describes the path that was taken.</p></dd>
<dt><a href="#AxiosController">AxiosController</a></dt>
<dd><p>Class for transfering data between front- &amp; backend with the axios-framework.</p></dd>
<dt><a href="#GraphService">GraphService</a></dt>
<dd><p>Class for accessing &amp; saving a graph to the backend</p></dd>
</dl>

## Members

<dl>
<dt><a href="#Edge">Edge</a></dt>
<dd><p>Necessary for JSON parsing.</p></dd>
<dt><a href="#Graph">Graph</a></dt>
<dd><p>Necessary for JSON parsing.</p></dd>
<dt><a href="#GraphFactory">GraphFactory</a></dt>
<dd><p>Necessary for JSON parsing.</p></dd>
<dt><a href="#AnswerType">AnswerType</a></dt>
<dd><p>Represents the attribute answerType of Node.</p></dd>
<dt><a href="#AnswerType">AnswerType</a></dt>
<dd><p>Represents a vertice (node) in the graph data structure.
Can be parsed from JSON.</p></dd>
<dt><a href="#Node">Node</a></dt>
<dd><p>Necessary for JSON parsing.</p></dd>
</dl>

<a name="Answer"></a>

## Answer
<p>Vue viewmodel.</p>

**Kind**: global class  
<a name="Question"></a>

## Question
<p>Vue viewmodel.</p>

**Kind**: global class  
<a name="Result"></a>

## Result
<p>Vue viewmodel.</p>

**Kind**: global class  
<a name="Edge"></a>

## Edge
<p>Represents a connection between two vertices (nodes) in a graph.
Can be parsed from JSON.</p>

**Kind**: global class  
<a name="Graph"></a>

## Graph
<p>Represents a graph data structure optimized for this application.
Currently, it contains the config for the recommendation generators. This should be moved in the next iteration.
Can be parsed from JSON.</p>

**Kind**: global class  

* [Graph](#Graph)
    * [.addNode(node2Add)](#Graph+addNode)
    * [.addEdge(edge2Add)](#Graph+addEdge)
    * [.findNode(nodeId)](#Graph+findNode)

<a name="Graph+addNode"></a>

### graph.addNode(node2Add)
<p>Adds a node if a node with the same nodeId does not yet exist.
The passed object will be cloned before it is added to the collection.</p>

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param |
| --- |
| node2Add | 

<a name="Graph+addEdge"></a>

### graph.addEdge(edge2Add)
<p>Adds an edge to the graph if it's source node and target node do exist.
The passed edge object will be cloned before it is added to the collection.</p>

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param |
| --- |
| edge2Add | 

<a name="Graph+findNode"></a>

### graph.findNode(nodeId)
<p>Finds an existing node by Id. Returns null if node doesn't exist.</p>

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param |
| --- |
| nodeId | 

<a name="GraphFactory"></a>

## GraphFactory
<p>Creates instances of the Graph object for a json string.
Handles the JSON parsing.</p>

**Kind**: global class  
<a name="GraphFactory.createGraphFromJSON"></a>

### GraphFactory.createGraphFromJSON(data)
<p>Parses the JSON and attempts tro create a viable Graph object.</p>

**Kind**: static method of [<code>GraphFactory</code>](#GraphFactory)  

| Param | Description |
| --- | --- |
| data | <p>JSON formatted string</p> |

<a name="GraphIterator"></a>

## GraphIterator
<p>Graph implementation of GraphIteratorInterface</p>

**Kind**: global class  

* [GraphIterator](#GraphIterator)
    * [.answersForCurrentNode()](#GraphIterator+answersForCurrentNode)
    * [.choose(edgeId)](#GraphIterator+choose)
    * [.isFinalNode()](#GraphIterator+isFinalNode)
    * [.getPath()](#GraphIterator+getPath)

<a name="GraphIterator+answersForCurrentNode"></a>

### graphIterator.answersForCurrentNode()
<p>Returns the edges that can be reached with 1 step from the current node.</p>

**Kind**: instance method of [<code>GraphIterator</code>](#GraphIterator)  
<a name="GraphIterator+choose"></a>

### graphIterator.choose(edgeId)
<p>Perform a single step on the graph to a neighbour.
The chosen edge will become the new current node.</p>

**Kind**: instance method of [<code>GraphIterator</code>](#GraphIterator)  

| Param |
| --- |
| edgeId | 

<a name="GraphIterator+isFinalNode"></a>

### graphIterator.isFinalNode()
<p>returns whether current node is of attribute finalNode.</p>

**Kind**: instance method of [<code>GraphIterator</code>](#GraphIterator)  
<a name="GraphIterator+getPath"></a>

### graphIterator.getPath()
<p>returns PathResult[] containing all the steps that have been taken by calling choose.
This accurately describes the path that was taken.</p>

**Kind**: instance method of [<code>GraphIterator</code>](#GraphIterator)  
<a name="GraphTools"></a>

## GraphTools
<p>Helper class for working with Graph objects.</p>

**Kind**: global class  

* [GraphTools](#GraphTools)
    * [.getExtremas(graph)](#GraphTools.getExtremas)
    * [.convertScoreToPercentage(score, min, max)](#GraphTools.convertScoreToPercentage) ⇒

<a name="GraphTools.getExtremas"></a>

### GraphTools.getExtremas(graph)
<p>Returns the shortest and longest path present in the graph.</p>

**Kind**: static method of [<code>GraphTools</code>](#GraphTools)  

| Param |
| --- |
| graph | 

<a name="GraphTools.convertScoreToPercentage"></a>

### GraphTools.convertScoreToPercentage(score, min, max) ⇒
<p>Converts a student's score (an integer) into non-negative, rounded number (Range: 0 - 100)</p>

**Kind**: static method of [<code>GraphTools</code>](#GraphTools)  
**Returns**: <p>percentage The number representing the percentage of the student's score</p>  

| Param | Description |
| --- | --- |
| score | <p>The student's score</p> |
| min | <p>The lowest score possible</p> |
| max | <p>The highest score possible</p> |

<a name="PathResult"></a>

## PathResult
<p>Represents a single step in a graph.
An array of PathResult accurately and completely describes the path that was taken.</p>

**Kind**: global class  
<a name="AxiosController"></a>

## AxiosController
<p>Class for transfering data between front- &amp; backend with the axios-framework.</p>

**Kind**: global class  

* [AxiosController](#AxiosController)
    * [.get(url, url)](#AxiosController+get) ⇒
    * [.post(url, dataToPost)](#AxiosController+post) ⇒
    * [.isHeaderSet(header)](#AxiosController+isHeaderSet)
    * [.setHeader(header, value)](#AxiosController+setHeader)

<a name="AxiosController+get"></a>

### axiosController.get(url, url) ⇒
<p>Makes a get request with the axios-framework</p>

**Kind**: instance method of [<code>AxiosController</code>](#AxiosController)  
**Returns**: <p>A promise with the requested data.</p>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>The url for the get request.</p> |
| url |  |  |

<a name="AxiosController+post"></a>

### axiosController.post(url, dataToPost) ⇒
<p>Makes a post request with the axios-framework.</p>

**Kind**: instance method of [<code>AxiosController</code>](#AxiosController)  
**Returns**: <p>A promise if the post request was successfull.</p>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>The url for the post request.</p> |
| dataToPost | <code>string</code> | <p>The data object which will be sent to the server</p> |

<a name="AxiosController+isHeaderSet"></a>

### axiosController.isHeaderSet(header)
<p>Checks if a header is set in all requests.</p>

**Kind**: instance method of [<code>AxiosController</code>](#AxiosController)  

| Param | Description |
| --- | --- |
| header | <p>The to be checked header.</p> |

<a name="AxiosController+setHeader"></a>

### axiosController.setHeader(header, value)
<p>Set a header in all requests.</p>

**Kind**: instance method of [<code>AxiosController</code>](#AxiosController)  

| Param | Description |
| --- | --- |
| header | <p>Key.</p> |
| value | <p>Value.</p> |

<a name="GraphService"></a>

## GraphService
<p>Class for accessing &amp; saving a graph to the backend</p>

**Kind**: global class  

* [GraphService](#GraphService)
    * [.post(graphToPost)](#GraphService+post) ⇒
    * [.get()](#GraphService+get) ⇒
    * [.getJSON()](#GraphService+getJSON) ⇒

<a name="GraphService+post"></a>

### graphService.post(graphToPost) ⇒
<p>Saves the graph in the database.</p>

**Kind**: instance method of [<code>GraphService</code>](#GraphService)  
**Returns**: <p>A boolean promise if the post request was successful.</p>  

| Param | Type | Description |
| --- | --- | --- |
| graphToPost | <code>string</code> | <p>The graph which will be saved.</p> |

<a name="GraphService+get"></a>

### graphService.get() ⇒
<p>Accesses the graph from the backend.</p>

**Kind**: instance method of [<code>GraphService</code>](#GraphService)  
**Returns**: <p>A promise with the graph object.</p>  
<a name="GraphService+getJSON"></a>

### graphService.getJSON() ⇒
<p>Accesses the graph in the backend.</p>

**Kind**: instance method of [<code>GraphService</code>](#GraphService)  
**Returns**: <p>The graph in JSON-Format.</p>  
<a name="Edge"></a>

## Edge
<p>Necessary for JSON parsing.</p>

**Kind**: global variable  
<a name="Graph"></a>

## Graph
<p>Necessary for JSON parsing.</p>

**Kind**: global variable  

* [Graph](#Graph)
    * [.addNode(node2Add)](#Graph+addNode)
    * [.addEdge(edge2Add)](#Graph+addEdge)
    * [.findNode(nodeId)](#Graph+findNode)

<a name="Graph+addNode"></a>

### graph.addNode(node2Add)
<p>Adds a node if a node with the same nodeId does not yet exist.
The passed object will be cloned before it is added to the collection.</p>

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param |
| --- |
| node2Add | 

<a name="Graph+addEdge"></a>

### graph.addEdge(edge2Add)
<p>Adds an edge to the graph if it's source node and target node do exist.
The passed edge object will be cloned before it is added to the collection.</p>

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param |
| --- |
| edge2Add | 

<a name="Graph+findNode"></a>

### graph.findNode(nodeId)
<p>Finds an existing node by Id. Returns null if node doesn't exist.</p>

**Kind**: instance method of [<code>Graph</code>](#Graph)  

| Param |
| --- |
| nodeId | 

<a name="GraphFactory"></a>

## GraphFactory
<p>Necessary for JSON parsing.</p>

**Kind**: global variable  
<a name="GraphFactory.createGraphFromJSON"></a>

### GraphFactory.createGraphFromJSON(data)
<p>Parses the JSON and attempts tro create a viable Graph object.</p>

**Kind**: static method of [<code>GraphFactory</code>](#GraphFactory)  

| Param | Description |
| --- | --- |
| data | <p>JSON formatted string</p> |

<a name="AnswerType"></a>

## AnswerType
<p>Represents the attribute answerType of Node.</p>

**Kind**: global variable  
<a name="AnswerType"></a>

## AnswerType
<p>Represents a vertice (node) in the graph data structure.
Can be parsed from JSON.</p>

**Kind**: global variable  
<a name="Node"></a>

## Node
<p>Necessary for JSON parsing.</p>

**Kind**: global variable  
<a name="Node+addEdge"></a>

### node.addEdge(edge)
<p>Add (reachable) edge.</p>

**Kind**: instance method of [<code>Node</code>](#Node)  

| Param |
| --- |
| edge | 

