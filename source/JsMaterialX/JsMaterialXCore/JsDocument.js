// jsDocument
addWrapper(function(Module, api) {
    /** Setup the Document class */
    api.createDocument = wrapperFunction(Module.createDocument);

    api.Document = wrapperFactory(Module.Document);

    var _importLibrary = Module.Document.prototype.importLibrary;
    api.Document.prototype.importLibrary = function() {
        var arg1 = arguments[0];
        var arg2 = arguments[1] || null;
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
        var arg1 = arguments[0] || '';
        return _addMaterial.call(this, arg1);
    };

    var _getMaterials = Module.Document.prototype.getMaterials;
    api.Document.prototype.getMaterials = function() {
        var vec = _getMaterials.call(this);
        return vecToArray(vec);
    };

    var _addGeomInfo = Module.Document.prototype.addGeomInfo;
    api.Document.prototype.addGeomInfo = function() {
        var arg1 = arguments[0] || '';
        var arg2 = arguments[1] || api.UNIVERSAL_GEOM_NAME;
        return _addGeomInfo.call(this, arg1, arg2);
    };

    var _getGeomInfos = Module.Document.prototype.getGeomInfos;
    api.Document.prototype.getGeomInfos = function() {
        var vec = _getGeomInfos.call(this);
        return vecToArray(vec);
    };

    var _getGeomAttrValue = Module.Document.prototype.getGeomAttrValue;
    api.Document.prototype.getGeomAttrValue = function() {
        var arg1 = arguments[0];
        var arg2 = arguments[1] || api.UNIVERSAL_GEOM_NAME;
        return _getGeomAttrValue.call(this, arg1, arg2);
    };

    var _getGeomPropDefs = Module.Document.prototype.getGeomPropDefs;
    api.Document.prototype.getGeomPropDefs = function() {
        var vec = _getGeomPropDefs.call(this);
        return vecToArray(vec);
    };

    var _addLook = Module.Document.prototype.addLook;
    api.Document.prototype.addLook = function() {
        var arg1 = arguments[0] || '';
        return _addLook.call(this, arg1);
    };

    var _getLooks = Module.Document.prototype.getLooks;
    api.Document.prototype.getLooks = function() {
        var vec = _getLooks.call(this);
        return vecToArray(vec);
    };

    var _addLookGroup = Module.Document.prototype.addLookGroup;
    api.Document.prototype.addLookGroup = function() {
        var arg1 = arguments[0] || '';
        return _addLookGroup.call(this, arg1);
    };

    var _getLookGroups = Module.Document.prototype.getLookGroups;
    api.Document.prototype.getLookGroups = function() {
        var vec = _getLookGroups.call(this);
        return vecToArray(vec);
    };

    var _addCollection = Module.Document.prototype.addCollection;
    api.Document.prototype.addCollection = function() {
        var arg1 = arguments[0] || '';
        return _addCollection.call(this, arg1);
    };

    var _getCollections = Module.Document.prototype.getCollections;
    api.Document.prototype.getCollections = function() {
        var vec = _getCollections.call(this);
        return vecToArray(vec);
    };

    var _getMatchingImplementations = Module.Document.prototype.getMatchingImplementations;
    api.Document.prototype.getMatchingImplementations = function() {
        var arg1 = arguments[0];
        var vec = _getMatchingImplementations.call(this, arg1);
        return vecToArray(vec);
    };

    var _addPropertySet = Module.Document.prototype.addPropertySet;
    api.Document.prototype.addPropertySet = function() {
        var arg1 = arguments[0] || '';
        return _addPropertySet.call(this, arg1);
    };

    var _getPropertySets = Module.Document.prototype.getPropertySets;
    api.Document.prototype.getPropertySets = function() {
        var vec = _getPropertySets.call(this);
        return vecToArray(vec);
    };

    var _addVariantSet = Module.Document.prototype.addVariantSet;
    api.Document.prototype.addVariantSet = function() {
        var arg1 = arguments[0] || '';
        return _addVariantSet.call(this, arg1);
    };

    var _getVariantSets = Module.Document.prototype.getVariantSets;
    api.Document.prototype.getVariantSets = function() {
        var vec = _getVariantSets.call(this);
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
});
