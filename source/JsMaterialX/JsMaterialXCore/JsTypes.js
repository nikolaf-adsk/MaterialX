var JsTypes = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        api.DEFAULT_TYPE_STRING = Module.DEFAULT_TYPE_STRING();
        api.FILENAME_TYPE_STRING = Module.FILENAME_TYPE_STRING();
        api.GEOMNAME_TYPE_STRING = Module.GEOMNAME_TYPE_STRING();
        api.SURFACE_SHADER_TYPE_STRING = Module.SURFACE_SHADER_TYPE_STRING();
        api.DISPLACEMENT_SHADER_TYPE_STRING = Module.DISPLACEMENT_SHADER_TYPE_STRING();
        api.VOLUME_SHADER_TYPE_STRING = Module.VOLUME_SHADER_TYPE_STRING();
        api.LIGHT_SHADER_TYPE_STRING = Module.LIGHT_SHADER_TYPE_STRING();
        api.MULTI_OUTPUT_TYPE_STRING = Module.MULTI_OUTPUT_TYPE_STRING();
        api.NONE_TYPE_STRING = Module.NONE_TYPE_STRING();
        api.VALUE_STRING_TRUE = Module.VALUE_STRING_TRUE();
        api.VALUE_STRING_FALSE = Module.VALUE_STRING_FALSE();
        api.NAME_PREFIX_SEPARATOR = Module.NAME_PREFIX_SEPARATOR();
        api.NAME_PATH_SEPARATOR = Module.NAME_PATH_SEPARATOR();
        api.ARRAY_VALID_SEPARATORS = Module.ARRAY_VALID_SEPARATORS();
        api.ARRAY_PREFERRED_SEPARATOR = Module.ARRAY_PREFERRED_SEPARATOR();
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsTypes.js');
        validator.classValidatorCb('Types', null, function() {
            MaterialX.DEFAULT_TYPE_STRING;
            MaterialX.FILENAME_TYPE_STRING;
            MaterialX.GEOMNAME_TYPE_STRING;
            MaterialX.SURFACE_SHADER_TYPE_STRING;
            MaterialX.DISPLACEMENT_SHADER_TYPE_STRING;
            MaterialX.VOLUME_SHADER_TYPE_STRING;
            MaterialX.LIGHT_SHADER_TYPE_STRING;
            MaterialX.MULTI_OUTPUT_TYPE_STRING;
            MaterialX.NONE_TYPE_STRING;
            MaterialX.VALUE_STRING_TRUE;
            MaterialX.VALUE_STRING_FALSE;
            MaterialX.NAME_PREFIX_SEPARATOR;
            MaterialX.NAME_PATH_SEPARATOR;
            MaterialX.ARRAY_VALID_SEPARATORS;
            MaterialX.ARRAY_PREFERRED_SEPARATOR;
        });
        validator.validate();
    }
};
