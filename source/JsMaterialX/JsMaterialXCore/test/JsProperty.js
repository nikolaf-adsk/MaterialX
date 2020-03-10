addValidator(function() {
    var validator = new Validator('JsProperty.js');

    validator.classValidatorCb(
        'Property',
        function() {},
        function() {
            MaterialX.Property.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'PropertyAssign',
        function() {},
        function() {
            MaterialX.PropertyAssign.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'PropertySet',
        function() {},
        function() {
            MaterialX.PropertySet.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'PropertySetAssign',
        function() {},
        function() {
            MaterialX.PropertySetAssign.CATEGORY;
        }
    );

    validator.validate();
});
