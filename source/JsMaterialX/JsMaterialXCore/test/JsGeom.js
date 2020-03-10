addValidator(function() {
    var validator = new Validator('JsGeom.js');

    validator.classValidatorCb(
        'GeomElement',
        function() {},
        function() {}
    );

    validator.classValidatorCb(
        'GeomInfo',
        function() {},
        function() {
            MaterialX.GeomInfo.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'GeomAttr',
        function() {},
        function() {
            MaterialX.GeomAttr.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'GeomPropDef',
        function() {},
        function() {
            MaterialX.GeomPropDef.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'Collection',
        function() {},
        function() {
            MaterialX.Collection.CATEGORY;
        }
    );

    validator.validate();
});
