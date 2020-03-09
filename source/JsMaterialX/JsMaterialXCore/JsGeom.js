var JsGeom = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the GeomElement class */
        api.GeomElement = wrapperFactory(Module.GeomElement);

        /** Setup the GeomInfo class */
        api.GeomInfo = wrapperFactory(Module.GeomInfo);

        /** Setup the GeomAttr class */
        api.GeomAttr = wrapperFactory(Module.GeomAttr);

        /** Setup the GeomPropDef class */
        api.GeomPropDef = wrapperFactory(Module.GeomPropDef);

        /** Setup the Collection class */
        api.Collection = wrapperFactory(Module.Collection);

        api.geomStringsMatch = wrapperFunction(Module.geomStringsMatch);

        api.UNIVERSAL_GEOM_NAME = Module.UNIVERSAL_GEOM_NAME();
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsGeom.js');

        validator.classValidatorCb(
            'GeomElement',
            function() {
            },
            function() {
            }
        );

        validator.classValidatorCb(
            'GeomInfo',
            function() {
            },
            function() {
                MaterialX.GeomInfo.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'GeomAttr',
            function() {
            },
            function() {
                MaterialX.GeomAttr.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'GeomPropDef',
            function() {
            },
            function() {
                MaterialX.GeomPropDef.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'Collection',
            function() {
            },
            function() {
                MaterialX.Collection.CATEGORY;
            }
        );

        validator.validate();
    }
};
