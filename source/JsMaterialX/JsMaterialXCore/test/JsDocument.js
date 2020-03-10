addValidator(function() {
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
            doc.getNodeGraph('TEST1');
            doc.getNodeGraphs();
            doc.removeNodeGraph('TEST1');
            doc.getNodeGraphs();

            doc.addNode('Category', 'NodeName', 'FUN TYPE');

            doc.getMatchingPorts('NodeName');

            doc.addMaterial('NewMaterial11');
            doc.getMaterial('NewMaterial11');
            doc.getMaterials();
            doc.removeMaterial('NewMaterial11');
            doc.getMaterials();

            doc.addGeomInfo('GeomInfo');
            doc.getGeomInfo('GeomInfo');
            doc.getGeomInfos();
            doc.removeGeomInfo('GeomInfo');
            doc.getGeomInfos();
            doc.getGeomAttrValue('Attribute');
            doc.addGeomPropDef('Name', 'GeomProp');
            doc.getGeomPropDef('Name');
            doc.getGeomPropDefs();
            doc.removeGeomPropDef('Name');
            doc.getGeomPropDefs();

            doc.addLook('Look1');
            doc.getLook('Look1');
            doc.getLooks();
            doc.removeLook('Look1');
            doc.getLooks();

            doc.addLookGroup('LookGroup1');
            doc.getLookGroup('LookGroup1');
            doc.getLookGroups();
            doc.removeLookGroup('LookGroup1');
            doc.getLookGroups();

            doc.addCollection('Collection1');
            doc.getCollection('Collection1');
            doc.getCollections();
            doc.removeCollection('Collection1');

            doc.getMatchingImplementations('Something');

            doc.addPropertySet('PropSet1');
            doc.getPropertySet('PropSet1');
            doc.getPropertySets();
            doc.removePropertySet('PropSet1');
            doc.getPropertySets();

            doc.addVariantSet('VariantSet1');
            doc.getVariantSet('VariantSet1');
            doc.getVariantSets();
            doc.removeVariantSet('VariantSet1');
            doc.getVariantSets();

            doc.upgradeVersion(12, 22);

            doc.setColorManagementSystem('One');
            doc.hasColorManagementSystem();
            doc.getColorManagementSystem();
            doc.setColorManagementConfig('two');
            doc.hasColorManagementConfig();
            doc.getColorManagementConfig();

            doc.addTypeDef('TypeDef');
            // doc.getTypeDef('TypeDef');
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
});
