var JsUtil = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        api.getVersionString = Module.getVersionString;
        api.createValidName = function(str, char) {
            return Module.createValidName(str, char.charCodeAt(0));
        };

        api.makeVersionString = Module.makeVersionString;
        api.isValidName = Module.isValidName;
        api.incrementName = Module.incrementName;

        api.getVersionIntegers = function() {
            var vec = Module.getVersionIntegers();
            return vecToArray(vec);
        };
        api.splitString = function(str, spl) {
            var vecStr = Module.splitString(str, spl);
            var size = vecStr.size();
            var result = [];
            for (var i = 0; i < size; i++) {
                result.push(vecStr.get(i));
            }
            return result;
        };

        api.replaceSubstrings = Module.replaceSubstrings;
        api.prettyPrint = Module.prettyPrint;
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
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

            var element = new MaterialX.Element(null, 'hello', 'world');
            console.log('prettyPrint(element): ' + MaterialX.prettyPrint(element));
        });
        validator.validate();
    }
};
