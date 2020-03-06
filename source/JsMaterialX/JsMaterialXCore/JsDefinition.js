var JsDefinition = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the NodeDef class */
        api.NodeDef = wrapperFactory(Module.NodeDef);
        var _getImplementation = Module.NodeDef.prototype.getImplementation;
        api.NodeDef.prototype.getImplementation = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            return _getImplementation.call(this, arg1, arg2);
        };

        /** Setup the Implementation class */
        api.Implementation = wrapperFactory(Module.Implementation);

        /** Setup the TypeDef class */
        api.TypeDef = wrapperFactory(Module.TypeDef);

        var _getMembers = Module.TypeDef.prototype.getMembers;
        api.TypeDef.prototype.getMembers = function() {
            var vec = _getMembers.call(this);
            return vecToArray(vec);
        };

        var _addMember = Module.TypeDef.prototype.addMember;
        api.TypeDef.prototype.addMember = function() {
            var arg1 = arguments[0] || '';
            return _addMember.call(this, arg1);
        };

        /** Setup the Member class */
        api.Member = wrapperFactory(Module.Member);

        /** Setup the Unit class */
        api.Unit = wrapperFactory(Module.Unit);

        /** Setup the UnitDef class */
        api.UnitDef = wrapperFactory(Module.UnitDef);

        var _getUnits = Module.UnitDef.prototype.getUnits;
        api.UnitDef.prototype.getUnits = function() {
            var vec = _getUnits.call(this);
            return vecToArray(vec);
        };

        /** Setup the UnitTypeDef class */
        api.UnitTypeDef = wrapperFactory(Module.UnitTypeDef);

        var _getUnitDefs = Module.UnitTypeDef.prototype.getUnitDefs;
        api.UnitTypeDef.prototype.getUnitDefs = function() {
            var vec = _getUnitDefs.call(this);
            return vecToArray(vec);
        };
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsDefinition.js');

        validator.classValidatorCb(
            'NodeDef',
            function() {
                var doc = MaterialX.createDocument();
                var nodeDef = doc.addNodeDef('Name', 'Type', 'Node');
                nodeDef.setNodeString('NodeString');
                nodeDef.hasNodeString();
                nodeDef.getNodeString();
                nodeDef.setNodeGroup('Category');
                nodeDef.hasNodeGroup();
                nodeDef.getNodeGroup();
                nodeDef.getImplementation('test', 'this');
                // nodeDef.getInstantiatingShaderRefs();

                var node = doc.addNode('Category', 'Name11', 'Type');
                nodeDef.isVersionCompatible(node);
            },
            function() {
                MaterialX.NodeDef.CATEGORY;
                MaterialX.NodeDef.NODE_ATTRIBUTE;
                MaterialX.NodeDef.TEXTURE_NODE_GROUP;
                MaterialX.NodeDef.PROCEDURAL_NODE_GROUP;
                MaterialX.NodeDef.GEOMETRIC_NODE_GROUP;
                MaterialX.NodeDef.ADJUSTMENT_NODE_GROUP;
                MaterialX.NodeDef.CONDITIONAL_NODE_GROUP;
                MaterialX.NodeDef.ORGANIZATION_NODE_GROUP;
            }
        );

        validator.classValidatorCb(
            'Implementation',
            function() {
                var doc = MaterialX.createDocument();
                var impl = doc.addImplementation('Implementation');
                impl.setFile('fileString');
                impl.hasFile();
                impl.getFile();
                impl.setFunction('functionString');
                impl.hasFunction();
                impl.getFunction();
                impl.setLanguage('Language');
                impl.hasLanguage();
                impl.getLanguage();

                var nodeDef = doc.addNodeDef('Name', 'Type', 'Node');
                impl.setNodeDef(nodeDef);
                impl.getNodeDef();
            },
            function() {
                MaterialX.NodeDef.CATEGORY;
                MaterialX.NodeDef.FILE_ATTRIBUTE;
                MaterialX.NodeDef.FUNCTION_ATTRIBUTE;
                MaterialX.NodeDef.LANGUAGE_ATTRIBUTE;
            }
        );

        validator.classValidatorCb(
            'TypeDef',
            function() {
                var doc = MaterialX.createDocument();
                var typeDef = doc.addTypeDef('TypeDef');
                typeDef.setSemantic('Semantic');
                typeDef.hasSemantic();
                typeDef.getSemantic();
                typeDef.setContext('Context');
                typeDef.hasContext();
                typeDef.getContext();

                var member = typeDef.addMember('Member');
                typeDef.getMember('Member');
                typeDef.getMembers();
                typeDef.removeMember('Member');
                typeDef.getMembers();
            },
            function() {
                MaterialX.NodeDef.CATEGORY;
                MaterialX.NodeDef.SEMANTIC_ATTRIBUTE;
                MaterialX.NodeDef.CONTEXT_ATTRIBUTE;
            }
        );

        validator.classValidatorCb('Member', null, function() {
            MaterialX.Member.CATEGORY;
        });

        validator.classValidatorCb('Unit', null, function() {
            MaterialX.Unit.CATEGORY;
        });

        validator.classValidatorCb(
            'UnitDef',
            function() {
                var doc = MaterialX.createDocument();
                var unitDef = doc.addUnitDef("UnitDef");
                unitDef.setUnitType("UnitType");
                unitDef.hasUnitType();
                unitDef.getUnitType();
                unitDef.addUnit("Unit");
                unitDef.getUnit("Unit");
                unitDef.getUnits();
            },
            function() {
                MaterialX.UnitDef.CATEGORY;
                MaterialX.UnitDef.UNITTYPE_ATTRIBUTE;
            }
        );

        validator.classValidatorCb(
            'UnitTypeDef',
            function() {
                var doc = MaterialX.createDocument();
                var unitTypeDef = doc.addUnitTypeDef("UnitTypeDef");
                unitTypeDef.getUnitDefs();
            },
            function() {
                MaterialX.UnitDef.CATEGORY;
            }
        );

        validator.validate();
    }
};
