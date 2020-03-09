var JsValue = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */

    typedValues: [
        'TypedValue_integer',
        'TypedValue_boolean',
        'TypedValue_float',
        'TypedValue_color2',
        'TypedValue_color3',
        'TypedValue_color4',
        'TypedValue_vector2',
        'TypedValue_vector3',
        'TypedValue_vector4',
        'TypedValue_matrix33',
        'TypedValue_matrix44',
        'TypedValue_string',
        'TypedValue_integerarray',
        'TypedValue_booleanarray',
        'TypedValue_floatarray',
        'TypedValue_stringarray'
    ],

    iterateTypedValues: function(cb) {
        this.typedValues.forEach(function(typedValue) {
            cb && cb(typedValue);
        });
    },

    generateWrappers: function(Module, api) {
        /** Setup the Value class */
        api.Value = wrapperFactory(Module.Value);

        /** Setup the typedValue classes */
        this.iterateTypedValues(function(typedValue) {
            api[typedValue] = wrapperFactory(Module[typedValue]);
        });
    },
    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsValue.js');

        validator.validate();
    }
};
