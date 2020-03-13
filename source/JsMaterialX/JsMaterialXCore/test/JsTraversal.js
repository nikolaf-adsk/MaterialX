addValidator(function() {
    var validator = new Validator('JsTraversal.js');

    validator.classValidatorCb('Edge', function() {
        var doc = MaterialX.createDocument();
        var element1 = doc.addChildOfCategory('generic');
        var element2 = doc.addChildOfCategory('generic');
        var element3 = doc.addChildOfCategory('generic');

        var edge = new MaterialX.Edge(element1, element2, element3);
        edge.getDownstreamElement();
        edge.getConnectingElement();
        edge.getUpstreamElement();
        edge.getName();
    });

    validator.classValidatorCb('TreeIterator', function() {
        var doc = MaterialX.createDocument();
        var element1 = doc.addChildOfCategory('generic');
        var treeIt = new MaterialX.TreeIterator(element1);
        treeIt.getElement();
        treeIt.getElementDepth();
        treeIt.setPruneSubtree(true);
        treeIt.getPruneSubtree();
        treeIt.__iter__();
        treeIt.next();
    });

    validator.classValidatorCb('GraphIterator', function() {
        var doc = MaterialX.createDocument();
        var element1 = doc.addChildOfCategory('generic');
        var material = doc.addMaterial('NewMaterial');
        var graphIt = new MaterialX.GraphIterator(element1, material);
        graphIt.getDownstreamElement();
        graphIt.getConnectingElement();
        graphIt.getUpstreamElement();
        graphIt.getUpstreamIndex();
        graphIt.getElementDepth();
        graphIt.getNodeDepth();
        graphIt.setPruneSubgraph(true);
        graphIt.getPruneSubgraph();
        graphIt.__iter__();
        graphIt.next();
    });

    validator.classValidatorCb('InheritanceIterator', function() {
        var doc = MaterialX.createDocument();
        var element1 = doc.addChildOfCategory('generic');
        var inherIt = new MaterialX.InheritanceIterator(element1);
        inherIt.__iter__();
        inherIt.next();
    });

    validator.validate();
});
