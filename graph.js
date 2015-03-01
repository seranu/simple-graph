/////////////////////////////////////////////////////////////////////////
//                             Node                                    //
/////////////////////////////////////////////////////////////////////////
function Node(nodeName) {
	this._name = nodeName;
	this._neighbours = [];
	var _self = this;
	this.addNeighbour = function(node) {
		if (_self._neighbours.some(function(element, index, array) {
						if (node._name == element._name) {
				return true;
			}
		}) == false) {			
			_self._neighbours.push(node);
			result = true;
		}
		return result;
	}

	this.removeNeighbour = function(node) {
		return _self._neighbours.some(function(element, index, array) {
			if (node._name == element._name) {
				array.splice(index, 1);
				return true;
			}
		});
	}

	this.visitNeighbours = function(callback) {
		result = false;
		if (_self._neighbours.length > 0) {
			result = _self._neighbours.some(function(element, index, array) {
				return callback(element);
			});
		}
		return result;
	}

	this.getNeighbours = function(){
		return _self._neighbours;
	}
}

/////////////////////////////////////////////////////////////////////////
//                           Graph                                     //
/////////////////////////////////////////////////////////////////////////
function Graph(graphName) {
	this._name = graphName;
	this._nodes = {};
	var _self = this;
	this.addNode = function(nodeName) {
		var result = false;
		if (!(nodeName in _self._nodes)) {
			_self._nodes[nodeName] = new Node(nodeName);
			result = true;
		}
		return result;
	}

	this.removeNode = function(nodeName) {
		var node = _self._nodes[nodeName];
		var result = false;
		if (node != undefined) {
			for (var property in _self._nodes) {			
				_self._nodes[property].removeNeighbour(node);
			}
			delete _self._nodes[nodeName];
			result = true;
		}
		return result;
	}

	this.addEdge = function(left, right, create) {
		var result = false;
		var leftNode = _self._nodes[left],
		rightNode = _self._nodes[right];
		if (leftNode != undefined && rightNode != undefined) {
			result = leftNode.addNeighbour(rightNode);
			return result;
		}
		if( create ){
			if( leftNode === undefined ){
				_self._nodes[left] = new Node(left);				
			} 
			if(rightNode === undefined){
				_self._nodes[right] = new Node(right);
			}
			result = _self._nodes[left].addNeighbour(_self._nodes[right]);			
		}		
		return result;
	}

	this.removeEdge = function(left, right) {
		var result = false;
		var leftNode = _self._nodes[left];
		var rightNode = _self._nodes[right];
		if (leftNode != undefined && rightNode != undefined) {
			leftNode.removeNeighbour(rightNode);
			result = true;
		}
		return result;
	}

	this.adjacent = function(left, right) {
		var result = false;
		var leftNode = _self._nodes[left],
		rightNode = _self._nodes[right];
		if (leftNode != undefined && rightNode != undefined) {
			leftNode.visitNeighbours(function(element) {
				if (element._name == rightNode._name) {
					result = true;
				}
			});
		}
		return result;
	}

	this.neighbours = function(nodeName) {
		var result = false;
		if( _self._nodes === undefined ){
			return;
		}
		var node = _self.nodes[nodeName];
		if (node != undefined) {
			var text = ''
			node.visitNeighbours(function(element) {
				text += element._name + ', ';
			});
			console.log(nodeName + ' : [' + text.substring(0, text.length - 2) + ']');
			result = true;
		}
		return result;
	}

	this.nodes = function() {
		var printText = '';
		for (var property in _self._nodes) {
			printText += property;
			printText += ' ';
		}
		//console.log(printText);
		return printText;
	}

	this._getNode = function(nodeName) {
		return _self._nodes[nodeName];
	}

	this.visit = function(node, callback) {
		if (node in _self._nodes) {
			callback(self._nodes[node]);
		}
	}

	this.printGraph = function() {
		console.log('***************************************************');
		console.log('Graph ' + this._name + ':');
		for (var property in _self._nodes) {
				this.neighbours(property);
		}
		console.log('***************************************************');
	}
}

module.exports = Graph;
