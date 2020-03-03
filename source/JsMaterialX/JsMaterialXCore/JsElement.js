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
            if (arguments.length === 0) {
                arguments = [null];
            }
            return _getNamePath.apply(this, arguments);
        };

        var _addChildOfCategory = Module.Element.prototype.addChildOfCategory;
        api.Element.prototype.addChildOfCategory = function() {
            arguments[1] = arguments[1] || '';
            arguments[2] = arguments[2] || true;
            return _addChildOfCategory.apply(this, arguments);
        };

        var _getAttributeNames = Module.Element.prototype.getAttributeNames;
        api.Element.prototype.getAttributeNames = function() {
            var vec = _getAttributeNames.call(this);
            return vecToArray(vec);
        };

        var _copyContentFrom = Module.Element.prototype.copyContentFrom;
        api.Element.prototype.copyContentFrom = function() {
            arguments[1] = arguments[1] === undefined ? null : arguments[1];
            return _copyContentFrom.apply(this, arguments);
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
     * @param {Object} api - Object containing the wrapped javascript functions
     */
    test: function(api) {
        setupTest('JsElement.js', function() {
            console.log(`------Checking CopyOptions`);
            var copyOptions = new api.CopyOptions();
            console.log('copyOptions.skipConflictingElements: ' + copyOptions.skipConflictingElements);
            copyOptions.skipConflictingElements = true;
            console.log('copyOptions.skipConflictingElements: ' + copyOptions.skipConflictingElements);

            console.log(`------Checking Element`);
            var element = new api.Element(null, 'test', 'parent');
            console.log('element.getCategory(): ' + element.getCategory());
            console.log('element.setCategory("TEST"): ' + element.setCategory('TEST'));
            console.log('element.getCategory(): ' + element.getCategory());

            console.log('element.getName(): ' + element.getName());
            // This api does not yet work please see comments in JsElement.cpp
            console.log('element.setName("element"): ' + element.setName('element'));
            console.log('element.getName(): ' + element.getName());

            // // This api does not yet work please see comments in JsElement.cpp
            // console.log('element.setFilePrefix("PREFIX"): ' + element.setFilePrefix("PREFIX"));
            console.log('element.hasFilePrefix(): ' + element.hasFilePrefix());
            console.log('element.getFilePrefix(): ' + element.getFilePrefix());

            console.log('element.getVersionIntegers(): ' + element.getVersionIntegers());

            console.log(`------Checking Element constants`);
            // Output constant variables
            console.log('Element.NAME_ATTRIBUTE: ' + api.Element.NAME_ATTRIBUTE);
            console.log('Element.FILE_PREFIX_ATTRIBUTE: ' + api.Element.FILE_PREFIX_ATTRIBUTE);
            console.log('Element.GEOM_PREFIX_ATTRIBUTE: ' + api.Element.GEOM_PREFIX_ATTRIBUTE);
            console.log('Element.COLOR_SPACE_ATTRIBUTE: ' + api.Element.COLOR_SPACE_ATTRIBUTE);
            console.log('Element.TARGET_ATTRIBUTE: ' + api.Element.TARGET_ATTRIBUTE);
            console.log('Element.VERSION_ATTRIBUTE: ' + api.Element.VERSION_ATTRIBUTE);
            console.log('Element.DEFAULT_VERSION_ATTRIBUTE: ' + api.Element.DEFAULT_VERSION_ATTRIBUTE);
            console.log('Element.INHERIT_ATTRIBUTE: ' + api.Element.INHERIT_ATTRIBUTE);
            console.log('Element.NAMESPACE_ATTRIBUTE: ' + api.Element.NAMESPACE_ATTRIBUTE);
            console.log('Element.DOC_ATTRIBUTE: ' + api.Element.DOC_ATTRIBUTE);

            console.log(`------Checking TypedElement`);
            var typedElement = new api.TypedElement(null, 'hello', 'world');
            console.log('typedElement.setType("newType"): ' + typedElement.setType('newType'));
            console.log('typedElement.hasType(): ' + typedElement.hasType());
            console.log('typedElement.getType(): ' + typedElement.getType());
            console.log('typedElement.isMultiOutputType(): ' + typedElement.isMultiOutputType());
            // console.log('typedElement.getTypeDef(): ' + typedElement.getTypeDef());

            console.log(`------Checking TypedElement constants`);
            console.log('TypedElement.TYPE_ATTRIBUTE: ' + api.TypedElement.TYPE_ATTRIBUTE);

            console.log(`------Checking ValueElement`);
            var valueElement = new api.ValueElement(null, 'hello', 'world');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            console.log('valueElement.getVersionIntegers(): ' + valueElement.getVersionIntegers());
            console.log('valueElement.setValueString("newValue"): ' + valueElement.setValueString('newValue'));
            console.log('valueElement.hasValueString(): ' + valueElement.hasValueString());
            console.log('valueElement.getValueString(): ' + valueElement.getValueString());
            // console.log('valueElement.getResolvedValueString(): ' + valueElement.getResolvedValueString());
            console.log(
                'valueElement.setInterfaceName("InterfaceName"): ' + valueElement.setInterfaceName('InterfaceName')
            );
            console.log('valueElement.hasInterfaceName(): ' + valueElement.hasInterfaceName());
            console.log('valueElement.getInterfaceName(): ' + valueElement.getInterfaceName());
            console.log('valueElement.setImplementationName("test"): ' + valueElement.setImplementationName('test'));
            console.log('valueElement.hasImplementationName(): ' + valueElement.hasImplementationName());
            console.log('valueElement.getImplementationName(): ' + valueElement.getImplementationName());
            // console.log('valueElement.getValue(): ' + valueElement.getValue());
            // console.log('valueElement.getBoundValue(): ' + valueElement.getBoundValue());
            // console.log('valueElement.getDefaultValue(): ' + valueElement.getDefaultValue()); // Value.h needs to binded for this to work.
            console.log('valueElement.setUnit("mm"): ' + valueElement.setUnit('mm'));
            console.log('valueElement.hasUnit(): ' + valueElement.hasUnit());
            console.log('valueElement.getUnit(): ' + valueElement.getUnit());
            console.log('valueElement.getActiveUnit(): ' + valueElement.getActiveUnit());
            console.log('valueElement.setUnitType("meters"): ' + valueElement.setUnitType('meters'));
            console.log('valueElement.hasUnitType(): ' + valueElement.hasUnitType());
            console.log('valueElement.getUnitType(): ' + valueElement.getUnitType());

            console.log(`------Checking ValueElement constants`);
            console.log('ValueElement.VALUE_ATTRIBUTE: ' + api.ValueElement.VALUE_ATTRIBUTE);
            console.log('ValueElement.INTERFACE_NAME_ATTRIBUTE: ' + api.ValueElement.INTERFACE_NAME_ATTRIBUTE);
            console.log(
                'ValueElement.IMPLEMENTATION_NAME_ATTRIBUTE: ' + api.ValueElement.IMPLEMENTATION_NAME_ATTRIBUTE
            );
            console.log(
                'ValueElement.IMPLEMENTATION_TYPE_ATTRIBUTE: ' + api.ValueElement.IMPLEMENTATION_TYPE_ATTRIBUTE
            );
            console.log('ValueElement.ENUM_ATTRIBUTE: ' + api.ValueElement.ENUM_ATTRIBUTE);
            console.log('ValueElement.ENUM_VALUES_ATTRIBUTE: ' + api.ValueElement.ENUM_VALUES_ATTRIBUTE);
            console.log('ValueElement.UNIT_ATTRIBUTE: ' + api.ValueElement.UNIT_ATTRIBUTE);
            console.log('ValueElement.UI_NAME_ATTRIBUTE: ' + api.ValueElement.UI_NAME_ATTRIBUTE);
            console.log('ValueElement.UI_FOLDER_ATTRIBUTE: ' + api.ValueElement.UI_FOLDER_ATTRIBUTE);
            console.log('ValueElement.UI_MIN_ATTRIBUTE: ' + api.ValueElement.UI_MIN_ATTRIBUTE);
            console.log('ValueElement.UI_MAX_ATTRIBUTE: ' + api.ValueElement.UI_MAX_ATTRIBUTE);
            console.log('ValueElement.UI_SOFT_MIN_ATTRIBUTE: ' + api.ValueElement.UI_SOFT_MIN_ATTRIBUTE);
            console.log('ValueElement.UI_SOFT_MAX_ATTRIBUTE: ' + api.ValueElement.UI_SOFT_MAX_ATTRIBUTE);
            console.log('ValueElement.UI_STEP_ATTRIBUTE: ' + api.ValueElement.UI_STEP_ATTRIBUTE);
            console.log('ValueElement.UI_ADVANCED_ATTRIBUTE: ' + api.ValueElement.UI_ADVANCED_ATTRIBUTE);

            console.log(`------Checking Token`);
            var token = new api.Token(null, 'tttt');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            console.log('token.getVersionIntegers(): ' + token.getVersionIntegers());
            console.log(`------Checking Token constants`);
            console.log(`Token.CATEGORY: ` + api.Token.CATEGORY);

            console.log(`------Checking StringResolver`);
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            console.log('StringResolver.create(): ' + api.StringResolver.create());
            var sr = api.StringResolver.create();
            console.log('sr.setFilePrefix("test"): ' + sr.setFilePrefix('test'));
            console.log('sr.getFilePrefix(): ' + sr.getFilePrefix());
            console.log('sr.setGeomPrefix("geom"): ' + sr.setGeomPrefix('geom'));
            console.log('sr.getGeomPrefix(): ' + sr.getGeomPrefix());
            console.log('sr.setUdimString("u"): ' + sr.setUdimString('u'));
            console.log('sr.setUvTileString("uv"): ' + sr.setUvTileString('uv'));
            console.log('sr.setFilenameSubstitution("hello", "world"): ' + sr.setFilenameSubstitution('hello', "world"));
            console.log('sr.getFilenameSubstitutions(): ' + JSON.stringify(sr.getFilenameSubstitutions()));
            console.log('sr.setGeomNameSubstitution("geomNameSub", "blah"): ' + sr.setGeomNameSubstitution('geomNameSub', 'blah'));
            console.log('sr.getGeomNameSubstitutions(): ' + JSON.stringify(sr.getGeomNameSubstitutions()));
            console.log('sr.resolve("The is a uv u test//", "blah"): ' + sr.resolve('The is a uv u test//', 'blah'));
            console.log(`------Checking StringResolver constants`);
            console.log(`Token.CATEGORY: ` + api.Token.CATEGORY);
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
