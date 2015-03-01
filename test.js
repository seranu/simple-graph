var Graph = require('./graph');

function TestAddNode(){
	var g = new Graph();
	g.addNode('1');
	g.addNode('2');
	g.addNode('3');
	
	if(g.nodes() === '1 2 3 '){		
		return 'PASS';
	}
	return 'FAIL';
}

function TestRemoveNode(){
	var g = new Graph();
	g.addNode('1');
	g.addNode('2');
	g.addNode('3');
	
	if(g.nodes() !== '1 2 3 '){		
		return 'FAIL';
	}

	g.removeNode('2');
	if(g.nodes() !== '1 3 '){
		return 'FAIL';
	}
	return 'PASS';
}

function TestAdjacent(){
	var g = new Graph();
	g.addNode('1');
	g.addNode('2');
	g.addNode('3');

	if( g.adjacent( '2', '3') ){
		return 'FAIL';
	}
	g.addEdge('1','2');
	g.addEdge('1','3');
	if( !g.adjacent('1', '3') ){
		return 'FAIL';
	}
	if( !g.adjacent('1', '2') ){
		return 'FAIL';
	}

	return 'PASS';
}

function RunTests(){
	console.log('TestAddNode:    ' + TestAddNode());
	console.log('TestRemoveNode: ' + TestRemoveNode());
	console.log('TestAdjacent:   ' + TestAdjacent());
	//TestAdjacent();
}

RunTests();