addValidator(function() {
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
            nodeDef.getInstantiatingShaderRefs();

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
            var unitDef = doc.addUnitDef('UnitDef');
            unitDef.setUnitType('UnitType');
            unitDef.hasUnitType();
            unitDef.getUnitType();
            unitDef.addUnit('Unit');
            unitDef.getUnit('Unit');
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
            var unitTypeDef = doc.addUnitTypeDef('UnitTypeDef');
            unitTypeDef.getUnitDefs();
        },
        function() {
            MaterialX.UnitDef.CATEGORY;
        }
    );

    validator.validate();
});
