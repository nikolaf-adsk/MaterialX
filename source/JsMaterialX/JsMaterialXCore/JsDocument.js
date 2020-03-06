var JsDocument = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the Document class */
        api.createDocument = wrapperFunction(Module.createDocument);

        api.Document = wrapperFactory(Module.Document);

        var _importLibrary = Module.Document.prototype.importLibrary;
        api.Document.prototype.importLibrary = function() {
            var arg1 = arguments[0];
            var arg2 = arguments[1] || null; /** TODO: this should be a nullptr not null. */
            return _importLibrary.call(this, arg1, arg2);
        };

        var _getReferencedSourceUris = Module.Document.prototype.getReferencedSourceUris;
        api.Document.prototype.getReferencedSourceUris = function() {
            var vec = _getReferencedSourceUris.call(this);
            return vecToArray(vec);
        };

        var _addNodeGraph = Module.Document.prototype.addNodeGraph;
        api.Document.prototype.addNodeGraph = function() {
            var arg1 = arguments[0] || '';
            return _addNodeGraph.call(this, arg1);
        };

        var _getNodeGraphs = Module.Document.prototype.getNodeGraphs;
        api.Document.prototype.getNodeGraphs = function() {
            var vec = _getNodeGraphs.call(this);
            return vecToArray(vec);
        };

        var _getMatchingPorts = Module.Document.prototype.getMatchingPorts;
        api.Document.prototype.getMatchingPorts = function() {
            var arg1 = arguments[0];
            var vec = _getMatchingPorts.call(this, arg1);
            return vecToArray(vec);
        };

        var _addMaterial = Module.Document.prototype.addMaterial;
        api.Document.prototype.addMaterial = function() {
            var arg1 = arguments[1] || '';
            return _addMaterial.call(this, arg1);
        };

        var _addLook = Module.Document.prototype.addLook;
        api.Document.prototype.addLook = function() {
            var arg1 = arguments[1] || '';
            return _addLook.call(this, arg1);
        };

        var _getMatchingImplementations = Module.Document.prototype.getMatchingImplementations;
        api.Document.prototype.getMatchingImplementations = function() {
            var arg1 = arguments[0];
            var vec = _getMatchingImplementations.call(this, arg1);
            return vecToArray(vec);
        };

        var _addTypeDef = Module.Document.prototype.addTypeDef;
        api.Document.prototype.addTypeDef = function() {
            var arg1 = arguments[0] || '';
            return _addTypeDef.call(this, arg1);
        };

        var _getTypeDefs = Module.Document.prototype.getTypeDefs;
        api.Document.prototype.getTypeDefs = function() {
            var vec = _getTypeDefs.call(this);
            return vecToArray(vec);
        };

        var _addNodeDef = Module.Document.prototype.addNodeDef;
        api.Document.prototype.addNodeDef = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || api.DEFAULT_TYPE_STRING;
            var arg3 = arguments[2] || '';
            return _addNodeDef.call(this, arg1, arg2, arg3);
        };
        var _getNodeDefs = Module.Document.prototype.getNodeDefs;
        api.Document.prototype.getNodeDefs = function() {
            var vec = _getNodeDefs.call(this);
            return vecToArray(vec);
        };

        var _getMatchingNodeDefs = Module.Document.prototype.getMatchingNodeDefs;
        api.Document.prototype.getMatchingNodeDefs = function() {
            var arg1 = arguments[0];
            var vec = _getMatchingNodeDefs.call(this, arg1);
            return vecToArray(vec);
        };

        var _addImplementation = Module.Document.prototype.addImplementation;
        api.Document.prototype.addImplementation = function() {
            var arg1 = arguments[0] || '';
            return _addImplementation.call(this, arg1);
        };

        var _getImplementations = Module.Document.prototype.getImplementations;
        api.Document.prototype.getImplementations = function() {
            var vec = _getImplementations.call(this);
            return vecToArray(vec);
        };

        var _getUnitDefs = Module.Document.prototype.getUnitDefs;
        api.Document.prototype.getUnitDefs = function() {
            var vec = _getUnitDefs.call(this);
            return vecToArray(vec);
        };

        var _getUnitTypeDefs = Module.Document.prototype.getUnitTypeDefs;
        api.Document.prototype.getUnitTypeDefs = function() {
            var vec = _getUnitTypeDefs.call(this);
            return vecToArray(vec);
        };
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsDocument.js');

        validator.classValidatorCb(
            'Document',
            function() {
                var doc = MaterialX.createDocument();
                doc.initialize();
                doc.copy();
                var copyOptions = new MaterialX.CopyOptions();
                var doc2 = MaterialX.createDocument();
                doc.importLibrary(doc2, copyOptions);
                doc.getReferencedSourceUris();
                var nodeGraph1 = doc.addNodeGraph('newNodeGraph');
                nodeGraph1.setName('TEST1');

                var nodeGraph1 = doc.addNodeGraph('TEST2');
                var nodeGraph2 = doc.getNodeGraph('TEST1');
                doc.getNodeGraphs();
                doc.removeNodeGraph('TEST1');
                doc.getNodeGraphs();

                var node1 = doc.addNode('Category', 'NodeName', 'FUN TYPE');

                doc.getMatchingPorts('NodeName');

                // doc.addMaterial("NewMaterial");

                doc.getMatchingImplementations('Something');

                doc.upgradeVersion(12, 22);

                doc.setColorManagementSystem('One');
                doc.hasColorManagementSystem();
                doc.getColorManagementSystem();
                doc.setColorManagementConfig('two');
                doc.hasColorManagementConfig();
                doc.getColorManagementConfig();

                doc.addTypeDef('TypeDef');
                // doc.getTypeDef("TypeDef");
                doc.getTypeDefs();
                doc.removeTypeDef('TypeDef');
                doc.getTypeDefs();

                doc.addNodeDef('NodeName2', 'NodeType2', 'Node2');
                doc.getNodeDef('NodeName2');
                doc.getNodeDefs();
                doc.removeNodeDef('NodeName2');
                doc.getNodeDefs();
                doc.getMatchingNodeDefs('NodeName2');

                doc.addImplementation('Implementation');
                doc.getImplementation('Implementation');
                doc.getImplementations();
                doc.removeImplementation('Implementation');
                doc.getImplementations();

                doc.addUnitDef('UnitDef1');
                doc.getUnitDef('UnitDef1');
                doc.getUnitDefs();
                doc.removeUnitDef('UnitDef1');
                doc.getUnitDefs();

                doc.addUnitTypeDef('UnitTypeDef');
                doc.getUnitTypeDef('UnitTypeDef');
                doc.getUnitTypeDefs();
                doc.removeUnitTypeDef('UnitTypeDef');
                doc.getUnitTypeDefs();
            },
            function() {}
        );

        validator.validate();
    }
};
