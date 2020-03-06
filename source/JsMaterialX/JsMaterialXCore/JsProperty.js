var JsProperty = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the Property class */
        api.Property = wrapperFactory(Module.Property);

        /** Setup the PropertyAssign class */
        api.PropertyAssign = wrapperFactory(Module.PropertyAssign);

        /** Setup the PropertySet class */
        api.PropertySet = wrapperFactory(Module.PropertySet);

        /** Setup the PropertySetAssign class */
        api.PropertySetAssign = wrapperFactory(Module.PropertySetAssign);
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsProperty.js');

        validator.classValidatorCb(
            'Property',
            function() {
            },
            function() {
                MaterialX.Property.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'PropertyAssign',
            function() {
            },
            function() {
                MaterialX.PropertyAssign.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'PropertySet',
            function() {
            },
            function() {
                MaterialX.PropertySet.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'PropertySetAssign',
            function() {
            },
            function() {
                MaterialX.PropertySetAssign.CATEGORY;
            }
        );

        validator.validate();
    }
};
