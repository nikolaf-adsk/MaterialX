addValidator(function() {
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
            var element = doc.addChildOfCategory('generic');
            element.getCategory();
            element.setCategory('TEST');
            element.getCategory();

            element.getName();
            element.setName('element');
            var element2 = doc.addChildOfCategory('generic');
            element.getNamePath(element2);
            var parent = doc.addChildOfCategory('parent');
            element.setInheritsFrom(parent);
            element.getInheritsFrom();
            element.hasInheritedBase(parent);

            element.setFilePrefix('PREFIX');
            element.getActiveFilePrefix();
            element.setColorSpace('colorSpace');
            element.getActiveColorSpace();
            element.setGeomPrefix('GeomPrefix');
            element.getActiveGeomPrefix();
            element.setTarget('target');
            element.setInheritString('inherit');
            element.setNamespace('space');
            element.setVersionString('10.2.2');
            element.setDefaultVersion(true);
            element.setDocString('doc');

            element.hasInheritanceCycle();
            element.getQualifiedName('element');

            element.hasFilePrefix();
            element.getFilePrefix();

            element.getVersionIntegers();

            element.getChildren();

            element.getDocument();
            element.traverseTree();
            element.traverseGraph(null);
            element.getUpstreamEdge();
            element.getUpstreamEdgeCount();
            element.getUpstreamElement();

            element.traverseInheritance();

            element.setSourceUri('source/uri');
            element.hasSourceUri();
            element.getSourceUri();

            element.getActiveSourceUri();
            element.validate();

            var element2 = doc.addChildOfCategory('generic');
            element.copyContentFrom(element2);
            element.clearContent();

            element.createValidChildName('New Child');

            element.createStringResolver();

            element.asString();
            element.__str__();
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
            var typedElement = doc.addToken('TOKEN');
            typedElement.setType('newType');
            typedElement.hasType();
            typedElement.getType();
            typedElement.isMultiOutputType();
            typedElement.getTypeDef();
        },
        function() {
            MaterialX.TypedElement.TYPE_ATTRIBUTE;
        }
    );

    validator.classValidatorCb(
        'ValueElement',
        function() {
            var doc = MaterialX.createDocument();
            var valueElement = doc.addParameter();
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            valueElement.getVersionIntegers();
            valueElement.setValueString('hello, world');
            valueElement.hasValueString();
            valueElement.getValueString();
            valueElement.getResolvedValueString();
            valueElement.setInterfaceName('InterfaceName');
            valueElement.hasInterfaceName();
            valueElement.getInterfaceName();
            valueElement.setImplementationName('test');
            valueElement.hasImplementationName();
            valueElement.getImplementationName();
            valueElement.getValue();
            var material = doc.addMaterial('MATERIAL');
            valueElement.getBoundValue(material);
            valueElement.getDefaultValue();
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
});
