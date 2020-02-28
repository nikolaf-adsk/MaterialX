var WasmElement = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        api.CopyOptions = Module.CopyOptions;
        api.Element = Module.Element;

        var _getVersionIntegers = Module.Element.prototype.getVersionIntegers;
        api.Element.prototype.getVersionIntegers = function() {
            // The version vector needs to be changed into an array.
            var vec = _getVersionIntegers.call(this);
            return vecToArray(vec);
        };

        var _setName = Module.Element.prototype.setName;
        api.Element.prototype.setName = function() {
            catchPtrError(_setName, this, arguments);
        };

        var _getNamePath = Module.Element.prototype.getNamePath;
        api.Element.prototype.getNamePath = function() {
            if (arguments.length === 0) {
                arguments = [null];
            }
            catchPtrError(_getNamePath, this, arguments);
        };

        var _setInheritsFrom = Module.Element.prototype.setInheritsFrom;
        api.Element.prototype.setInheritsFrom = function() {
            catchPtrError(_setInheritsFrom, this, arguments);
        };
    },

    /**
     * Console log the returned values for the the api functions.
     * @param {Object} api - Object containing the wrapped javascript functions
     */
    test: function(api) {
        var copyOptions = new api.CopyOptions();
        console.log('copyOptions.skipConflictingElements: ' + copyOptions.skipConflictingElements);
        copyOptions.skipConflictingElements = true;
        console.log('copyOptions.skipConflictingElements: ' + copyOptions.skipConflictingElements);

        var element = new api.Element(null, 'test', 'parent');
        console.log('element.getCategory(): ' + element.getCategory());
        console.log('element.setCategory("TEST"): ' + element.setCategory('TEST'));
        console.log('element.getCategory(): ' + element.getCategory());

        console.log('element.getName(): ' + element.getName());
        // This api does not yet work please see comments in WasmElement.cpp
        console.log('element.setName("element"): ' + element.setName('element'));
        console.log('element.getName(): ' + element.getName());

        // // This api does not yet work please see comments in WasmElement.cpp
        // console.log('element.setFilePrefix("PREFIX"): ' + element.setFilePrefix("PREFIX"));
        console.log('element.hasFilePrefix(): ' + element.hasFilePrefix());
        console.log('element.getFilePrefix(): ' + element.getFilePrefix());
    }

};
