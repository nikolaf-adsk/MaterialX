addValidator(function() {
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
});
