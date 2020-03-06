var JsElement = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the CopyOptions class */
        api.CopyOptions = Module.CopyOptions;

        /** Setup the Element class */
        api.Element = wrapperFactory(Module.Element);

        var _getVersionIntegers = Module.Element.prototype.getVersionIntegers;
        api.Element.prototype.getVersionIntegers = function() {
            // The version vector needs to be changed into an array.
            var vec = _getVersionIntegers.call(this);
            return vecToArray(vec);
        };

        var _getNamePath = Module.Element.prototype.getNamePath;
        api.Element.prototype.getNamePath = function() {
            var arg1 = arguments[0] || null;
            return _getNamePath.call(this, arg1);
        };

        var _addChildOfCategory = Module.Element.prototype.addChildOfCategory;
        api.Element.prototype.addChildOfCategory = function() {
            var arg1 = arguments[0];
            var arg2 =arguments[1] || '';
            var arg3 =arguments[2] || true;
            return _addChildOfCategory.call(this, arg1, arg2, arg3);
        };

        var _getAttributeNames = Module.Element.prototype.getAttributeNames;
        api.Element.prototype.getAttributeNames = function() {
            var vec = _getAttributeNames.call(this);
            return vecToArray(vec);
        };

        var _copyContentFrom = Module.Element.prototype.copyContentFrom;
        api.Element.prototype.copyContentFrom = function() {
            var arg1 = arguments[1] === undefined ? null : arguments[1];
            return _copyContentFrom.call(this, arg1);
        };

        /** Setup the TypedElement class */
        api.TypedElement = wrapperFactory(Module.TypedElement);

        /** Setup the ValueElement class */
        api.ValueElement = wrapperFactory(Module.ValueElement);

        /** Setup the Token class */
        api.Token = wrapperFactory(Module.Token);

        /** Setup the StringResolver class */
        api.StringResolver = wrapperFactory(Module.StringResolver);
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
        var validator = new Validator('JsElement.js');
        validator.classValidatorCb('CopyOptions', function() {
            var copyOptions = new MaterialX.CopyOptions();
            copyOptions.skipConflictingElements;
            copyOptions.skipConflictingElements = true;
            copyOptions.skipConflictingElements;
        });

        validator.classValidatorCb(
            'Element',
            function() {
                var doc = MaterialX.createDocument();
                var element = doc.addChildOfCategory("generic");
                element.getCategory();
                element.setCategory('TEST');
                element.getCategory();

                element.getName();
                // This MaterialX does not yet work please see comments in JsElement.cpp
                element.setName('element');
                element.getName();

                // This MaterialX does not yet work please see comments in JsElement.cpp
                // element.setFilePrefix("PREFIX");
                element.hasFilePrefix();
                element.getFilePrefix();

                element.getVersionIntegers();
            },
            function() {
                MaterialX.Element.NAME_ATTRIBUTE;
                MaterialX.Element.FILE_PREFIX_ATTRIBUTE;
                MaterialX.Element.GEOM_PREFIX_ATTRIBUTE;
                MaterialX.Element.COLOR_SPACE_ATTRIBUTE;
                MaterialX.Element.TARGET_ATTRIBUTE;
                MaterialX.Element.VERSION_ATTRIBUTE;
                MaterialX.Element.DEFAULT_VERSION_ATTRIBUTE;
                MaterialX.Element.INHERIT_ATTRIBUTE;
                MaterialX.Element.NAMESPACE_ATTRIBUTE;
                MaterialX.Element.DOC_ATTRIBUTE;
            }
        );

        validator.classValidatorCb(
            'TypedElement',
            function() {
                var doc = MaterialX.createDocument();
                var typedElement = doc.addToken("TOKEN");
                typedElement.setType('newType');
                typedElement.hasType();
                typedElement.getType();
                typedElement.isMultiOutputType();
                // typedElement.getTypeDef();
            },
            function() {
                MaterialX.TypedElement.TYPE_ATTRIBUTE;
            }
        );

        validator.classValidatorCb(
            'ValueElement',
            function() {
                var doc = MaterialX.createDocument();
                var valueElement = doc.addParameter("ValueElement")
                // Make sure that a method defined in Element is callable.
                // This is checks that inheritance works.
                valueElement.getVersionIntegers();
                valueElement.setValueString('newValue');
                valueElement.hasValueString();
                valueElement.getValueString();
                // valueElement.getResolvedValueString();
                valueElement.setInterfaceName('InterfaceName');
                valueElement.hasInterfaceName();
                valueElement.getInterfaceName();
                valueElement.setImplementationName('test');
                valueElement.hasImplementationName();
                valueElement.getImplementationName();
                // valueElement.getValue();
                // valueElement.getBoundValue();
                // valueElement.getDefaultValue(); // Value.h needs to binded for this to work.
                valueElement.setUnit('mm');
                valueElement.hasUnit();
                valueElement.getUnit();
                valueElement.getActiveUnit();
                valueElement.setUnitType('meters');
                valueElement.hasUnitType();
                valueElement.getUnitType();
            },
            function() {
                MaterialX.ValueElement.VALUE_ATTRIBUTE;
                MaterialX.ValueElement.INTERFACE_NAME_ATTRIBUTE;
                MaterialX.ValueElement.IMPLEMENTATION_NAME_ATTRIBUTE;
                MaterialX.ValueElement.IMPLEMENTATION_TYPE_ATTRIBUTE;
                MaterialX.ValueElement.ENUM_ATTRIBUTE;
                MaterialX.ValueElement.ENUM_VALUES_ATTRIBUTE;
                MaterialX.ValueElement.UNIT_ATTRIBUTE;
                MaterialX.ValueElement.UI_NAME_ATTRIBUTE;
                MaterialX.ValueElement.UI_FOLDER_ATTRIBUTE;
                MaterialX.ValueElement.UI_MIN_ATTRIBUTE;
                MaterialX.ValueElement.UI_MAX_ATTRIBUTE;
                MaterialX.ValueElement.UI_SOFT_MIN_ATTRIBUTE;
                MaterialX.ValueElement.UI_SOFT_MAX_ATTRIBUTE;
                MaterialX.ValueElement.UI_STEP_ATTRIBUTE;
                MaterialX.ValueElement.UI_ADVANCED_ATTRIBUTE;
            }
        );

        validator.classValidatorCb(
            'Token',
            function() {
                var token = new MaterialX.Token(null, 'tttt');
                // Make sure that a method defined in Element is callable.
                // This is checks that inheritance works.
                token.getVersionIntegers();
            },
            function() {
                MaterialX.Token.CATEGORY;
            }
        );

        validator.classValidatorCb('StringResolver', function() {
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            MaterialX.StringResolver.create();
            var sr = MaterialX.StringResolver.create();
            sr.setFilePrefix('test');
            sr.getFilePrefix();
            sr.setGeomPrefix('geom');
            sr.getGeomPrefix();
            sr.setUdimString('u');
            sr.setUvTileString('uv');
            sr.setFilenameSubstitution('hello', 'world');
            sr.getFilenameSubstitutions();
            sr.setGeomNameSubstitution('geomNameSub', 'blah');
            sr.getGeomNameSubstitutions();
            sr.resolve('The is a uv u test//', 'blah');
        });
        validator.validate();
    }
};
