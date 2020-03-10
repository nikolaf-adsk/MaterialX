// jsNode
addWrapper(function(Module, api) {
    /** Setup the Node class */
    api.Node = wrapperFactory(Module.Node);

    var _getNodeDef = Module.Node.prototype.getNodeDef;
    api.Node.prototype.getNodeDef = function() {
        var arg1 = arguments[0] || '';
        return _getNodeDef.call(this, arg1);
    };

    var _getImplementation = Module.Node.prototype.getImplementation;
    api.Node.prototype.getImplementation = function() {
        var arg1 = arguments[0] || '';
        var arg2 = arguments[1] || '';
        return _getImplementation.call(this, arg1, arg2);
    };

    /** Setup the GraphElement class */
    api.GraphElement = wrapperFactory(Module.GraphElement);

    var _addNode = Module.GraphElement.prototype.addNode;
    api.GraphElement.prototype.addNode = function() {
        var arg1 = arguments[0];
        var arg2 = arguments[1] || '';
        var arg3 = arguments[2] || api.DEFAULT_TYPE_STRING;
        return _addNode.call(this, arg1, arg2, arg3);
    };

    var _addNodeInstance = Module.GraphElement.prototype.addNodeInstance;
    api.GraphElement.prototype.addNodeInstance = function() {
        var arg1 = arguments[0];
        var arg2 = arguments[1] || '';
        return _addNodeInstance.call(this, arg1, arg2);
    };

    var _getNodes = Module.GraphElement.prototype.getNodes;
    api.GraphElement.prototype.getNodes = function() {
        var arg1 = arguments[0] || '';
        return _getNodes.call(this, arg1);
    };

    var _addBackdrop = Module.GraphElement.prototype.addBackdrop;
    api.GraphElement.prototype.addBackdrop = function() {
        var arg1 = arguments[0] || '';
        return _addBackdrop.call(this, arg1);
    };

    var _flattenSubgraphs = Module.GraphElement.prototype.flattenSubgraphs;
    api.GraphElement.prototype.flattenSubgraphs = function() {
        var arg1 = arguments[0] || '';
        return _flattenSubgraphs.call(this, arg1);
    };

    /** Setup the NodeGraph class */
    api.NodeGraph = wrapperFactory(Module.NodeGraph);

    /** Setup the Backdrop class */
    api.Backdrop = wrapperFactory(Module.Backdrop);
});
