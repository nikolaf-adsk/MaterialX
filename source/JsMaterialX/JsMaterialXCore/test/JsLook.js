addValidator(function() {
    var validator = new Validator('JsLook.js');

    validator.classValidatorCb(
        'Look',
        function() {
            var doc = MaterialX.createDocument();
            var look = doc.addLook('Look1');
            look.addMaterialAssign('Name', 'Material');
            look.getMaterialAssign('Name');
            look.getMaterialAssigns();
            look.getActiveMaterialAssigns();
            look.removeMaterialAssign('Name');
            look.getMaterialAssigns();

            look.addPropertyAssign('PropertyAssign');
            look.getPropertyAssign('PropertyAssign');
            look.getPropertyAssigns();
            look.getActivePropertyAssigns();
            look.removePropertyAssign('PropertyAssign');
            look.getPropertyAssigns();

            look.addPropertySetAssign('PropertySetAssign');
            look.getPropertySetAssign('PropertySetAssign');
            look.getPropertySetAssigns();
            look.getActivePropertySetAssigns();
            look.removePropertySetAssign('PropertySetAssign');
            look.getPropertySetAssigns();

            look.addVariantAssign('VariantAssign');
            look.getVariantAssign('VariantAssign');
            look.getVariantAssigns();
            look.getActiveVariantAssigns();
            look.removeVariantAssign('VariantAssign');
            look.getVariantAssigns();

            look.addVisibility('Visibility');
            look.getVisibility('Visibility');
            look.getVisibilities();
            look.getActiveVisibilities();
            look.removeVisibility('Visibility');
            look.getVisibilities();
        },
        function() {
            MaterialX.Look.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'LookGroup',
        function() {
            var doc = MaterialX.createDocument();
            var lookGroup = doc.addLookGroup('LookGroup');

            lookGroup.getLooks();
            lookGroup.setLooks('Look1,Look2');
            lookGroup.getLooks();
            lookGroup.getActiveLook();
            lookGroup.setActiveLook('Look1');
            lookGroup.getActiveLook();
        },
        function() {
            MaterialX.Look.CATEGORY;
            MaterialX.Look.LOOKS_ATTRIBUTE;
            MaterialX.Look.LOOKS_ATTRIBUTE;
        }
    );

    validator.classValidatorCb(
        'MaterialAssign',
        function() {
            var doc = MaterialX.createDocument();
            var look = doc.addLook('Look2');
            var materialAssign = look.addMaterialAssign('MAterialAssign', 'MaTerial');
            materialAssign.setMaterial('material1');
            materialAssign.hasMaterial();
            materialAssign.getMaterial();
            materialAssign.setExclusive(true);
            materialAssign.getExclusive();
            materialAssign.getReferencedMaterial();
            materialAssign.getReferencedMaterialNode();
        },
        function() {
            MaterialX.MaterialAssign.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'Visibility',
        function() {
            var doc = MaterialX.createDocument();
            var visibility = doc._addChildVisibility('Visibility');
            visibility.setViewerGeom('geom');
            visibility.hasViewerGeom();
            visibility.getViewerGeom();
            visibility.setViewerCollection('collection');
            visibility.hasViewerCollection();
            visibility.getViewerCollection();
            visibility.setVisibilityType('type');
            visibility.hasVisibilityType();
            visibility.getVisibilityType();
            visibility.setVisible(true);
            visibility.getVisible();
            visibility.setVisible(false);
            visibility.getVisible();
        },
        function() {
            MaterialX.Visibility.CATEGORY;
        }
    );

    validator.validate();
});
