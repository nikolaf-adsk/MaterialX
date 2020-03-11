addValidator(function() {
    var validator = new Validator('JsUtils.js');
    validator.classValidatorCb('Utils', function() {
        MaterialX.getVersionString();
        MaterialX.createValidName('test.this.here', '_');
        MaterialX.makeVersionString(10, 1);
        MaterialX.isValidName('test.name');
        MaterialX.incrementName('Blah');
        MaterialX.getVersionIntegers();
        MaterialX.splitString('hello', 'l');
        MaterialX.replaceSubstrings('This.is.a.test///', { '.': '_', '//': ')' });

        var doc = MaterialX.createDocument();
        var element = doc.addChildOfCategory('generic');
        MaterialX.prettyPrint(element);
    });
    validator.validate();
});
