var JsLook = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the Look class */
        api.Look = wrapperFactory(Module.Look);

        var _addMaterialAssign = Module.Look.prototype.addMaterialAssign;
        api.Look.prototype.addMaterialAssign = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || '';
            return _addMaterialAssign.call(this, arg1, arg2);
        };

        var _addPropertyAssign = Module.Look.prototype.addPropertyAssign;
        api.Look.prototype.addPropertyAssign = function() {
            var arg1 = arguments[0] || '';
            return _addPropertyAssign.call(this, arg1);
        };

        var _addPropertySetAssign = Module.Look.prototype.addPropertySetAssign;
        api.Look.prototype.addPropertySetAssign = function() {
            var arg1 = arguments[0] || '';
            return _addPropertySetAssign.call(this, arg1);
        };

        var _addVariantAssign = Module.Look.prototype.addVariantAssign;
        api.Look.prototype.addVariantAssign = function() {
            var arg1 = arguments[0] || '';
            return _addVariantAssign.call(this, arg1);
        };

        var _addVisibility = Module.Look.prototype.addVisibility;
        api.Look.prototype.addVisibility = function() {
            var arg1 = arguments[0] || '';
            return _addVisibility.call(this, arg1);
        };

        var _getPropertyAssigns = Module.Look.prototype.getPropertyAssigns;
        api.Look.prototype.getPropertyAssigns = function() {
            var vec = _getPropertyAssigns.call(this);
            return vecToArray(vec);
        };

        var _getActivePropertyAssigns = Module.Look.prototype.getActivePropertyAssigns;
        api.Look.prototype.getActivePropertyAssigns = function() {
            var vec = _getActivePropertyAssigns.call(this);
            return vecToArray(vec);
        };

        var _getPropertySetAssigns = Module.Look.prototype.getPropertySetAssigns;
        api.Look.prototype.getPropertySetAssigns = function() {
            var vec = _getPropertySetAssigns.call(this);
            return vecToArray(vec);
        };


        var _getActivePropertySetAssigns = Module.Look.prototype.getActivePropertySetAssigns;
        api.Look.prototype.getActivePropertySetAssigns = function() {
            var vec = _getActivePropertySetAssigns.call(this);
            return vecToArray(vec);
        };

        var _getVisibilities = Module.Look.prototype.getVisibilities;
        api.Look.prototype.getVisibilities = function() {
            var vec = _getVisibilities.call(this);
            return vecToArray(vec);
        };

        var _getActiveVisibilities = Module.Look.prototype.getActiveVisibilities;
        api.Look.prototype.getActiveVisibilities = function() {
            var vec = _getActiveVisibilities.call(this);
            return vecToArray(vec);
        };

        var _getMaterialAssigns = Module.Look.prototype.getMaterialAssigns;
        api.Look.prototype.getMaterialAssigns = function() {
            var vec = _getMaterialAssigns.call(this);
            return vecToArray(vec);
        };

        var _getActiveMaterialAssigns = Module.Look.prototype.getActiveMaterialAssigns;
        api.Look.prototype.getActiveMaterialAssigns = function() {
            var vec = _getActiveMaterialAssigns.call(this);
            return vecToArray(vec);
        };

        /** Setup the LookGroup class */
        api.LookGroup = wrapperFactory(Module.LookGroup);

        /** Setup the MaterialAssign class */
        api.MaterialAssign = wrapperFactory(Module.MaterialAssign);

        /** Setup the Visibility class */
        api.Visibility = wrapperFactory(Module.Visibility);
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
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
                look.removePropertyAssign("PropertyAssign");
                look.getPropertyAssigns();

                look.addPropertySetAssign("PropertySetAssign");
                look.getPropertySetAssign("PropertySetAssign");
                look.getPropertySetAssigns();
                look.getActivePropertySetAssigns();
                look.removePropertySetAssign("PropertySetAssign");
                look.getPropertySetAssigns();

                // var variantAssign = look.addVariantAssign('VariantAssign');

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
                var materialAssign = look.addMaterialAssign("MAterialAssign", "MaTerial")
                materialAssign.setMaterial("material1");
                materialAssign.hasMaterial();
                materialAssign.getMaterial();
                materialAssign.setExclusive(true);
                materialAssign.getExclusive();
                // materialAssign.getReferencedMaterial();
                // materialAssign.getReferencedMaterialNode();
            },
            function() {
                MaterialX.MaterialAssign.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'Visibility',
            function() {
                var doc = MaterialX.createDocument();
                var visibility = doc._addChildVisibility("Visibility");
                visibility.setViewerGeom("geom");
                visibility.hasViewerGeom();
                visibility.getViewerGeom();
                visibility.setViewerCollection("collection");
                visibility.hasViewerCollection();
                visibility.getViewerCollection();
                visibility.setVisibilityType("type");
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
    }
};
