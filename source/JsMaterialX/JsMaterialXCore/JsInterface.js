var JsInterface = {
    /**
     * Return wrappers for the exported functions.
     * @param {*} Module - Wasm Module with the exported c++ functions
     * @param {Object} api - Api object
     * @returns {Object} - Object containing the wrapped javascript functions
     */
    generateWrappers: function(Module, api) {
        /** Setup the Parameter class */
        api.Parameter = wrapperFactory(Module.Parameter);

        /** Setup the PortElement class */
        api.PortElement = wrapperFactory(Module.PortElement);

        /** Setup the Input class */
        api.Input = wrapperFactory(Module.Input);

        /** Setup the Output class */
        api.Output = wrapperFactory(Module.Output);

        /** Setup the InterfaceElement class */
        api.InterfaceElement = wrapperFactory(Module.InterfaceElement);

        var _addParameter = Module.InterfaceElement.prototype.addParameter;
        api.InterfaceElement.prototype.addParameter = function() {
            var arg1 = arguments[0] || api.DEFAULT_TYPE_STRING;
            var arg2 = arguments[1] || api.DEFAULT_TYPE_STRING;
            return _addParameter.call(this, arg1, arg2);
        };

        var _addInput = Module.InterfaceElement.prototype.addInput;
        api.InterfaceElement.prototype.addInput = function() {
            var arg1 = arguments[0] || api.DEFAULT_TYPE_STRING;
            var arg2 = arguments[1] || api.DEFAULT_TYPE_STRING;
            return _addInput.call(this, arg1, arg2);
        };

        var _addOutput = Module.InterfaceElement.prototype.addOutput;
        api.InterfaceElement.prototype.addOutput = function() {
            var arg1 = arguments[0] || '';
            var arg2 = arguments[1] || api.DEFAULT_TYPE_STRING;
            return _addOutput.call(this, arg1, arg2);
        };

        var _addToken = Module.InterfaceElement.prototype.addToken;
        api.InterfaceElement.prototype.addToken = function() {
            var arg1 = arguments[0] || '';
            return _addToken.call(this, arg1);
        };

        var _getParameterValue = Module.InterfaceElement.prototype.getParameterValue;
        api.InterfaceElement.prototype.getParameterValue = function() {
            var arg1 = arguments[0];
            var arg2 = arguments[1] || '';
            return _getParameterValue.call(this, arg1, arg2);
        };

        var _getInputValue = Module.InterfaceElement.prototype.getInputValue;
        api.InterfaceElement.prototype.getInputValue = function() {
            var arg1 = arguments[0];
            var arg2 = arguments[1] || '';
            return _getInputValue.call(this, arg1, arg2);
        };

        var _getDeclaration = Module.InterfaceElement.prototype.getDeclaration;
        api.InterfaceElement.prototype.getDeclaration = function() {
            var arg1 = arguments[0] || '';
            return _getDeclaration.call(this, arg1);
        };
    },

    /**
     * Console log the returned values for the the api functions.
     */
    test: function() {
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
            var portElement = new MaterialX.PortElement(null, 'category', 'tttt');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            portElement.getVersionIntegers();
            portElement.setNodeName('node');
            portElement.getNodeName();
            portElement.setChannels('channels');
            portElement.getChannels();
            // portElement.setConnectedNode('connectedNode');
            // portElement.getConnectedNode();
        });

        validator.classValidatorCb(
            'Input',
            function() {
                var input = new MaterialX.Input(null, 'tttt');
                input.getVersionIntegers();
                input.setDefaultGeomPropString('geomProp');
                input.hasDefaultGeomPropString();
                input.getDefaultGeomPropString();
                // input.getDefaultGeomProp();
            },
            function() {
                MaterialX.Input.CATEGORY;
            }
        );

        validator.classValidatorCb(
            'Output',
            function() {
                var output = new MaterialX.Output(null, 'tttt');
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
                var interfaceElement = new MaterialX.InterfaceElement(null, 'category', 'name');
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

                // interfaceElement.getParameterValue("ParameterValue", "target");
                // interfaceElement.getInputValue("name", "target");

                interfaceElement.setTokenValue('name', 'value');
                interfaceElement.getTokenValue('name');

                // interfaceElement.getDeclaration("value");
                // interfaceElement.isTypeCompatible();
            },
            function() {
                MaterialX.InterfaceElement.NODE_DEF_ATTRIBUTE;
            }
        );

        validator.validate();
    }
};
