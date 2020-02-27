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

        var element = new api.Element(null, "test", "parent");
        console.log('element.getCategory(): ' + element.getCategory());
        console.log('element.setCategory("TEST"): ' + element.setCategory("TEST"));
        console.log('element.getCategory(): ' + element.getCategory());

        console.log('element.getName(): ' + element.getName());
        console.log('element.setName("element"): ' + element.setName("element"));
        console.log('element.getName(): ' + element.getName());
    }
}
