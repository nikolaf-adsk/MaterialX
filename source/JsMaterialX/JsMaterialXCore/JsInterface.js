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
            var arg1 = arguments[0] || "";
            var arg2 = arguments[1] || api.DEFAULT_TYPE_STRING;
            return _addOutput.call(this, arg1, arg2);
        };

        var _addToken = Module.InterfaceElement.prototype.addToken;
        api.InterfaceElement.prototype.addToken = function() {
            var arg1 = arguments[0] || "";
            return _addToken.call(this, arg1);
        };

        var _getParameterValue = Module.InterfaceElement.prototype.getParameterValue;
        api.InterfaceElement.prototype.getParameterValue = function() {
            var arg1 = arguments[0];
            var arg2 = arguments[1] || "";
            return _getParameterValue.call(this, arg1, arg2);
        };

        var _getInputValue = Module.InterfaceElement.prototype.getInputValue;
        api.InterfaceElement.prototype.getInputValue = function() {
            var arg1 = arguments[0];
            var arg2 = arguments[1] || "";
            return _getInputValue.call(this, arg1, arg2);
        };

        var _getDeclaration = Module.InterfaceElement.prototype.getDeclaration;
        api.InterfaceElement.prototype.getDeclaration = function() {
            var arg1 = arguments[0] || "";
            return _getDeclaration.call(this, arg1);
        };
    },

    /**
     * Console log the returned values for the the api functions.
     * @param {Object} api - Object containing the wrapped javascript functions
     */
    test: function(api) {
        setupTest('JsInterface.js', function() {
            console.log(`------Checking Parameter`);
            var parameter = new api.Parameter(null, 'tttt');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            console.log('parameter.getVersionIntegers(): ' + parameter.getVersionIntegers());
            console.log(`------Checking Parameter constants`);
            console.log(`Parameter.CATEGORY: ` + api.Parameter.CATEGORY);

            console.log(`------Checking PortElement`);
            var portElement = new api.PortElement(null, 'category', 'tttt');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            console.log('portElement.getVersionIntegers(): ' + portElement.getVersionIntegers());
            console.log('portElement.setNodeName("node"): ' + portElement.setNodeName('node'));
            console.log('portElement.getNodeName(): ' + portElement.getNodeName());
            console.log('portElement.setChannels("channels"): ' + portElement.setChannels('channels'));
            console.log('portElement.getChannels(): ' + portElement.getChannels());
            // console.log(
            //     'portElement.setConnectedNode("connectedNode"): ' + portElement.setConnectedNode('connectedNode')
            // );
            // console.log('portElement.getConnectedNode(): ' + portElement.getConnectedNode());

            console.log(`------Checking Input`);
            var input = new api.Input(null, 'tttt');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            console.log('input.getVersionIntegers(): ' + input.getVersionIntegers());

            console.log('input.setDefaultGeomPropString("geomProp"): ' + input.setDefaultGeomPropString('geomProp'));
            console.log('input.hasDefaultGeomPropString(): ' + input.hasDefaultGeomPropString());
            console.log('input.getDefaultGeomPropString(): ' + input.getDefaultGeomPropString());
            // console.log('input.getDefaultGeomProp(): ' + input.getDefaultGeomProp());

            console.log(`------Checking Input constants`);
            console.log(`Input.CATEGORY: ` + api.Input.CATEGORY);

            console.log(`------Checking Output`);
            var output = new api.Output(null, 'tttt');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            console.log('output.getVersionIntegers(): ' + output.getVersionIntegers());
            console.log('output.hasUpstreamCycle(): ' + output.hasUpstreamCycle());

            console.log(`------Checking Output constants`);
            console.log(`Output.CATEGORY: ` + api.Output.CATEGORY);
            console.log(`Output.DEFAULT_INPUT_ATTRIBUTE: ` + api.Output.DEFAULT_INPUT_ATTRIBUTE);

            console.log(`------Checking InterfaceElement`);
            var interfaceElement = new api.InterfaceElement(null, 'category', 'name');
            // Make sure that a method defined in Element is callable.
            // This is checks that inheritance works.
            console.log('interfaceElement.getVersionIntegers(): ' + interfaceElement.getVersionIntegers());
            console.log(
                'interfaceElement.setNodeDefString("nodeDefString"): ' +
                    interfaceElement.setNodeDefString('nodeDefString')
            );
            console.log('interfaceElement.hasNodeDefString(): ' + interfaceElement.hasNodeDefString());
            console.log('interfaceElement.getNodeDefString(): ' + interfaceElement.getNodeDefString());
            console.log('interfaceElement.addParameter(): ' + interfaceElement.addParameter());
            console.log('interfaceElement.getParameter("color3"): ' + interfaceElement.getParameter('color3'));
            console.log('interfaceElement.getParameters(): ' + JSON.stringify(interfaceElement.getParameters()));
            console.log('interfaceElement.getParameterCount(): ' + interfaceElement.getParameterCount());
            console.log('interfaceElement.removeParameter("color3"): ' + interfaceElement.removeParameter('color3'));
            console.log(
                'interfaceElement.getActiveParameter("color3"): ' + interfaceElement.getActiveParameter('color3')
            );
            console.log('interfaceElement.getActiveParameters(): ' + interfaceElement.getActiveParameters());
            console.log('interfaceElement.addInput(): ' + interfaceElement.addInput());
            console.log('interfaceElement.getInput("color3"): ' + interfaceElement.getInput('color3'));
            console.log('interfaceElement.getInputs(): ' + interfaceElement.getInputs());
            console.log('interfaceElement.getInputCount(): ' + interfaceElement.getInputCount());
            console.log('interfaceElement.removeInput("color3"): ' + interfaceElement.removeInput('color3'));
            console.log('interfaceElement.getActiveInput("color3"): ' + interfaceElement.getActiveInput('color3'));
            console.log('interfaceElement.getActiveInputs(): ' + interfaceElement.getActiveInputs());
            
            console.log('interfaceElement.addOutput("test", "this"): ' + interfaceElement.addOutput("test", "this"));
            console.log('interfaceElement.getOutput("test"): ' + interfaceElement.getOutput("test"));
            console.log('interfaceElement.getOutputs(): ' + interfaceElement.getOutputs());
            console.log('interfaceElement.getOutputCount(): ' + interfaceElement.getOutputCount());
            console.log('interfaceElement.removeOutput("test"): ' + interfaceElement.removeOutput("test"));
            console.log('interfaceElement.getActiveOutput("test"): ' + interfaceElement.getActiveOutput("test"));
            console.log('interfaceElement.getActiveOutputs(): ' + interfaceElement.getActiveOutputs());

            console.log('interfaceElement.addToken("thisToken"): ' + interfaceElement.addToken("thisToken"));
            console.log('interfaceElement.getToken("thisToken"): ' + interfaceElement.getToken("thisToken"));
            console.log('interfaceElement.getTokens(): ' + interfaceElement.getTokens());
            console.log('interfaceElement.removeToken("thisToken"): ' + interfaceElement.removeToken("thisToken"));
            console.log('interfaceElement.getActiveToken("thisToken"): ' + interfaceElement.getActiveToken("thisToken"));
            console.log('interfaceElement.getActiveTokens(): ' + interfaceElement.getActiveTokens());

            console.log('interfaceElement.getActiveValueElement("ValueElement"): ' + interfaceElement.getActiveValueElement("ValueElement"));
            console.log('interfaceElement.getActiveValueElements(): ' + interfaceElement.getActiveValueElements());

            // console.log('interfaceElement.getParameterValue("ParameterValue", "target"): ' + interfaceElement.getParameterValue("ParameterValue", "target"));
            // console.log('interfaceElement.getInputValue("name", "target"): ' + interfaceElement.getInputValue("name", "target"));
            
            console.log('interfaceElement.setTokenValue("name", "value"): ' + interfaceElement.setTokenValue("name", "value"));
            console.log('interfaceElement.getTokenValue("name"): ' + interfaceElement.getTokenValue("name"));
            
            // console.log('interfaceElement.getDeclaration("value"): ' + interfaceElement.getDeclaration("value"));
            // console.log('interfaceElement.isTypeCompatible(): ' + interfaceElement.isTypeCompatible());

            console.log(`------Checking InterfaceElement constants`);
            console.log(`InterfaceElement.NODE_DEF_ATTRIBUTE: ` + api.InterfaceElement.NODE_DEF_ATTRIBUTE);
        });
    }
};
