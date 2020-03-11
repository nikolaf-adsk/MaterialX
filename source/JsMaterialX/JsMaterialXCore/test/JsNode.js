addValidator(function() {
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
});
