var JsNode = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
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
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsNode.js');

        validator.classValidatorCb(
            'Node',
            function() {
                var doc = MaterialX.createDocument();
                var node = doc.addNode('Node', 'TTT', 'TTT');
                var node1 = doc.addNode('Node1', 'TTT1', 'TTT1');
                node.setConnectedNode('name', node1);
                node.getConnectedNode('name');
                node.setConnectedNodeName('inputname', 'Node1');
                node.getConnectedNodeName('inputname');
                node.getNodeDef('name');
                node.getImplementation('target', 'java');
                node.getDownstreamPorts();
            },
            function() {
                MaterialX.Node.CATEGORY;
            }
        );

        validator.classValidatorCb('GraphElement', function() {
            var graphElement = MaterialX.createDocument();
            graphElement.addNode('category', 'name', 'type');
            var constNodeDefPtr = doc.addNodeDef('Name33', 'Type33', 'Node33');
            graphElement.addNodeInstance(constNodeDefPtr, 'nameNodeInstance');
            graphElement.getNode('name');
            graphElement.getNodes('category');
            graphElement.removeNode('name');
            graphElement.addBackdrop('name');
            graphElement.getBackdrop('name');
            graphElement.getBackdrops();
            graphElement.removeBackdrop('name');
            graphElement.flattenSubgraphs('something');
            graphElement.topologicalSort();
            graphElement.asStringDot();
        });

        validator.classValidatorCb(
            'NodeGraph',
            function() {
                var doc = MaterialX.createDocument();
                var nodeGraph = doc.addNodeGraph('NodeGraph');
                var nodeDef = doc.addNodeDef();
                nodeGraph.getNodeDef();
                nodeGraph.setNodeDef(nodeDef);
                nodeGraph.getNodeDef();
            },
            function() {
                MaterialX.NodeGraph.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'Backdrop',
            function() {
                var doc = MaterialX.createDocument();
                var backdrop = doc.addBackdrop();
                backdrop.getContains();
                backdrop.setContains('something');
                backdrop.getContains();

                backdrop.getWidth();
                backdrop.setWidth(44.0);
                backdrop.getWidth();

                backdrop.getHeight();
                backdrop.setHeight(33);
                backdrop.getHeight();
            },
            function() {
                MaterialX.Backdrop.CATEGORY;
                MaterialX.Backdrop.CONTAINS_ATTRIBUTE;
                MaterialX.Backdrop.WIDTH_ATTRIBUTE;
                MaterialX.Backdrop.HEIGHT_ATTRIBUTE;
            }
        );

        validator.validate();
    }
};
