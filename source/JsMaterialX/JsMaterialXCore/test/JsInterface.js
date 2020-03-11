addValidator(function() {
    var validator = new Validator('JsInterface.js');

    validator.classValidatorCb(
        'Parameter',
        function() {
            var parameter = new MaterialX.Parameter(null, 'tttt');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            parameter.getVersionIntegers();
        },
        function() {
            MaterialX.Parameter.CATEGORY;
        }
    );

    validator.classValidatorCb('PortElement', function() {
        var doc = MaterialX.createDocument();
        var portElement = doc.addInput('PortElement');
        // Make sure that a method defined in Element is callable.
        // This is checks that inheritance works.
        portElement.getVersionIntegers();
        portElement.setNodeName('node');
        portElement.getNodeName();
        portElement.setChannels('channels');
        portElement.getChannels();
        var node = doc.addNode('new Node');
        portElement.setConnectedNode(node);
        portElement.getConnectedNode();
    });

    validator.classValidatorCb(
        'Input',
        function() {
            var doc = MaterialX.createDocument();
            var input = doc.addInput('Input');
            input.getVersionIntegers();
            input.setDefaultGeomPropString('geomProp');
            input.hasDefaultGeomPropString();
            input.getDefaultGeomPropString();
            input.getDefaultGeomProp();
        },
        function() {
            MaterialX.Input.CATEGORY;
        }
    );

    validator.classValidatorCb(
        'Output',
        function() {
            var doc = MaterialX.createDocument();
            var output = doc.addOutput('Output');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            output.getVersionIntegers();
            output.hasUpstreamCycle();
        },
        function() {
            MaterialX.Output.CATEGORY;
            MaterialX.Output.DEFAULT_INPUT_ATTRIBUTE;
        }
    );

    validator.classValidatorCb(
        'InterfaceElement',
        function() {
            var doc = MaterialX.createDocument();
            var interfaceElement = doc.addNode('Category', '', 'Default');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            interfaceElement.getVersionIntegers();
            interfaceElement.setNodeDefString('nodeDefString');

            interfaceElement.hasNodeDefString();
            interfaceElement.getNodeDefString();
            interfaceElement.addParameter();
            interfaceElement.getParameter('color3');
            interfaceElement.getParameters();
            interfaceElement.getParameterCount();
            interfaceElement.removeParameter('color3');
            interfaceElement.getActiveParameter('color3');
            interfaceElement.getActiveParameters();
            interfaceElement.addInput();
            interfaceElement.getInput('color3');
            interfaceElement.getInputs();
            interfaceElement.getInputCount();
            interfaceElement.removeInput('color3');
            interfaceElement.getActiveInput('color3');
            interfaceElement.getActiveInputs();

            interfaceElement.addOutput('test', 'this');
            interfaceElement.getOutput('test');
            interfaceElement.getOutputs();
            interfaceElement.getOutputCount();
            interfaceElement.removeOutput('test');
            interfaceElement.getActiveOutput('test');
            interfaceElement.getActiveOutputs();

            interfaceElement.addToken('thisToken');
            interfaceElement.getToken('thisToken');
            interfaceElement.getTokens();
            interfaceElement.removeToken('thisToken');
            interfaceElement.getActiveToken('thisToken');
            interfaceElement.getActiveTokens();

            interfaceElement.getActiveValueElement('ValueElement');
            interfaceElement.getActiveValueElements();

            interfaceElement.getParameterValue('ParameterValue', 'target');
            interfaceElement.getInputValue('name', 'target');

            interfaceElement.setTokenValue('name', 'value');
            interfaceElement.getTokenValue('name');

            interfaceElement.getDeclaration('value');
            var iElem = doc.addImplementation();
            interfaceElement.isTypeCompatible(iElem);
        },
        function() {
            MaterialX.InterfaceElement.NODE_DEF_ATTRIBUTE;
        }
    );

    validator.validate();
});
