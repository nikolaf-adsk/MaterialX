var WasmUtil = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module) {
        var api = {};
        api.getVersionString = Module.getVersionString;
        api.createValidName = function(str, char) {
            return Module.createValidName(str, char.charCodeAt(0));
        };

        api.makeVersionString = Module.makeVersionString;
        api.isValidName = Module.isValidName;
        api.incrementName = Module.incrementName;

        api.getVersionIntegers = function() {
            var vecStr = Module.getVersionIntegers();
            var size = vecStr.size();
            var result = [];
            for (var i = 0; i < size; i++) {
                result.push(vecStr.get(i));
            }
            return result;
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

        return api;
    },

    /**
     * Console log the returned values for the the api functions.
     * @param {Object} api - Object containing the wrapped javascript functions
     */
    test: function(api) {
        console.log('getVersionString(): ' + api.getVersionString());
        console.log('createValidName("test.this.here", "_"): ' + api.createValidName('test.this.here', '_'));
        console.log('makeVersionString(10, 1): ' + api.makeVersionString(10, 1));
        console.log('isValidName("test.name"): ' + api.isValidName('test.name'));
        console.log('incrementName("Blah"): ' + api.incrementName('Blah'));
        console.log('getVersionIntegers(): ' + api.getVersionIntegers());
        console.log('splitString("hello", "l"): ' + api.splitString('hello', 'l'));
        console.log(
            'replaceSubstrings("This.is.a.test///", {".": "_", "//": ")"}): ' +
                api.replaceSubstrings('This.is.a.test///', { '.': '_', '//': ')' })
        );
    }
}
