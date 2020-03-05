var JsDocument = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the Document class */
        api.createDocument = wrapperFunction(Module.createDocument);
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsDocument.js');

        validator.classValidatorCb(
            'Document',
            function() {},
            function() {}
        );

        validator.validate();
    }
};
