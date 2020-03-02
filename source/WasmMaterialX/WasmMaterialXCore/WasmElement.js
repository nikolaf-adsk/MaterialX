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

        var _hasInheritedBase = Module.Element.prototype.hasInheritedBase;
        api.Element.prototype.hasInheritedBase = function() {
            catchPtrError(_hasInheritedBase, this, arguments);
        };

        var _setFilePrefix = Module.Element.prototype.setFilePrefix;
        api.Element.prototype.setFilePrefix = function() {
            catchPtrError(_setFilePrefix, this, arguments);
        };

        var _setColorSpace = Module.Element.prototype.setColorSpace;
        api.Element.prototype.setColorSpace = function() {
            catchPtrError(_setColorSpace, this, arguments);
        };

        var _setGeomPrefix = Module.Element.prototype.setGeomPrefix;
        api.Element.prototype.setGeomPrefix = function() {
            catchPtrError(_setGeomPrefix, this, arguments);
        };

        var _setTarget = Module.Element.prototype.setTarget;
        api.Element.prototype.setTarget = function() {
            catchPtrError(_setTarget, this, arguments);
        };

        var _setInheritString = Module.Element.prototype.setInheritString;
        api.Element.prototype.setInheritString = function() {
            catchPtrError(_setInheritString, this, arguments);
        };

        var _setNamespace = Module.Element.prototype.setNamespace;
        api.Element.prototype.setNamespace = function() {
            catchPtrError(_setNamespace, this, arguments);
        };

        var _setVersionString = Module.Element.prototype.setVersionString;
        api.Element.prototype.setVersionString = function() {
            catchPtrError(_setVersionString, this, arguments);
        };

        var _setDefaultVersion = Module.Element.prototype.setDefaultVersion;
        api.Element.prototype.setDefaultVersion = function() {
            catchPtrError(_setDefaultVersion, this, arguments);
        };

        var _setDocString = Module.Element.prototype.setDocString;
        api.Element.prototype.setDocString = function() {
            catchPtrError(_setDocString, this, arguments);
        };

        var _addChildOfCategory = Module.Element.prototype.addChildOfCategory;
        api.Element.prototype.addChildOfCategory = function() {
            arguments[1] = arguments[1] || '';
            arguments[2] = arguments[2] || true;
            catchPtrError(_addChildOfCategory, this, arguments);
        };

        var _setAttribute = Module.Element.prototype.setAttribute;
        api.Element.prototype.setAttribute = function() {
            catchPtrError(_setAttribute, this, arguments);
        };

        var _getAttributeNames = Module.Element.prototype.getAttributeNames;
        api.Element.prototype.getAttributeNames = function() {
            var vec = _getAttributeNames.call(this);
            return vecToArray(vec);
        };

        var _getRoot = Module.Element.prototype.getRoot;
        api.Element.prototype.getRoot = function() {
            catchPtrError(_getRoot, this, arguments);
        };

        var _validate = Module.Element.prototype.validate;
        api.Element.prototype.validate = function() {
            catchPtrError(_validate, this, arguments);
        };

        var _copyContentFrom = Module.Element.prototype.copyContentFrom;
        api.Element.prototype.copyContentFrom = function() {
            arguments[1] = arguments[1] === undefined ? null : arguments[1];
            catchPtrError(_copyContentFrom, this, arguments);
        };

        var _clearContent = Module.Element.prototype.clearContent;
        api.Element.prototype.clearContent = function() {
            catchPtrError(_clearContent, this, arguments);
        };
    },

    /**
     * Console log the returned values for the the api functions.
     * @param {Object} api - Object containing the wrapped javascript functions
     */
    test: function(api) {
        setupTest('WasmElement.js', function() {
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
        });
    },

    /** TODO: this should be removed. */
    createElements: function() {
        window.parent = new MaterialX.Element(null, 'Category', 'Parent');

        try {
            window.child = new MaterialX.Element(parent, 'Category', 'Child');
        } catch (exception) {
            console.error(`${Module.getExceptionMessage(exception)}`);
        }
    }
};
