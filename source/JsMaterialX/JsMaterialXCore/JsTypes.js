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
     * @param {Object} api - Object containing the wrapped javascript functions
     */
    test: function(api) {
        setupTest('JsTypes.js', function() {
            console.log('DEFAULT_TYPE_STRING: ' + api.DEFAULT_TYPE_STRING);
            console.log('FILENAME_TYPE_STRING: ' + api.FILENAME_TYPE_STRING);
            console.log('GEOMNAME_TYPE_STRING: ' + api.GEOMNAME_TYPE_STRING);
            console.log('SURFACE_SHADER_TYPE_STRING: ' + api.SURFACE_SHADER_TYPE_STRING);
            console.log('DISPLACEMENT_SHADER_TYPE_STRING: ' + api.DISPLACEMENT_SHADER_TYPE_STRING);
            console.log('VOLUME_SHADER_TYPE_STRING: ' + api.VOLUME_SHADER_TYPE_STRING);
            console.log('LIGHT_SHADER_TYPE_STRING: ' + api.LIGHT_SHADER_TYPE_STRING);
            console.log('MULTI_OUTPUT_TYPE_STRING: ' + api.MULTI_OUTPUT_TYPE_STRING);
            console.log('NONE_TYPE_STRING: ' + api.NONE_TYPE_STRING);
            console.log('VALUE_STRING_TRUE: ' + api.VALUE_STRING_TRUE);
            console.log('VALUE_STRING_FALSE: ' + api.VALUE_STRING_FALSE);
            console.log('NAME_PREFIX_SEPARATOR: ' + api.NAME_PREFIX_SEPARATOR);
            console.log('NAME_PATH_SEPARATOR: ' + api.NAME_PATH_SEPARATOR);
            console.log('ARRAY_VALID_SEPARATORS: ' + api.ARRAY_VALID_SEPARATORS);
            console.log('ARRAY_PREFERRED_SEPARATOR: ' + api.ARRAY_PREFERRED_SEPARATOR);
        });
    }
};
