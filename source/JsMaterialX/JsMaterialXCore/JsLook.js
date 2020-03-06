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
                // var materialAssign = look.addMaterialAssign('Name', 'Material');
                // look.getMaterialAssign('Name');

                // var propertyAssign = look.addPropertyAssign("PropertyAssign");

                // var propertySetAssign = look.addPropertySetAssign("PropertySetAssign");

                // var variantAssign = look.addVariantAssign('VariantAssign');

                // var visibility = look.addVisibility('Visibility');
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
                // var materialAssign = look.addMaterialAssign("MAterialAssign", "MaTerial")

                // materialAssign.setMaterial("material1");
                // materialAssign.hasMaterial();
                // materialAssign.getMaterial();
                // materialAssign.setExclusive(true);
                // materialAssign.getExclusive();
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
            },
            function() {
                MaterialX.Visibility.CATEGORY;
            }
        );

        validator.validate();
    }
};
