var JsVariant = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the Variant class */
        api.Variant = wrapperFactory(Module.Variant);

        /** Setup the VariantSet class */
        api.VariantSet = wrapperFactory(Module.VariantSet);

        var _addVariant = Module.VariantSet.prototype.addVariant;
        api.VariantSet.prototype.addVariant = function() {
            var arg1 = arguments[0] || '';
            return _addVariant.call(this, arg1);
        };

        var _getVariants = Module.VariantSet.prototype.getVariants;
        api.VariantSet.prototype.getVariants = function() {
            var vec = _getVariants.call(this);
            return vecToArray(vec);
        };
        
        /** Setup the VariantAssign class */
        api.VariantAssign = wrapperFactory(Module.VariantAssign);

        
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsVariant.js');

        validator.classValidatorCb(
            'Variant', null ,
            function() {
                MaterialX.Variant.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'VariantSet',
            function() {
                var doc = MaterialX.createDocument();
                var variantSet = doc.addVariantSet("variantSet");
                variantSet.addVariant("Variant");
                variantSet.getVariant("Variant");
                variantSet.getVariants();
                variantSet.removeVariant("Variant");
                variantSet.getVariants();

            },
            function() {
                MaterialX.VariantSet.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'VariantAssign',
            function() {
                var doc = MaterialX.createDocument();
                var look = doc.addLook("Look1");
                var variantAssign = look.addVariantAssign();
                variantAssign.setVariantSetString("test");
                variantAssign.hasVariantSetString();
                variantAssign.getVariantSetString();
                variantAssign.setVariantString("test");
                variantAssign.hasVariantString();
                variantAssign.getVariantString();
            },
            function() {
                MaterialX.VariantAssign.CATEGORY;
            }
        );


        validator.validate();
    }
};
